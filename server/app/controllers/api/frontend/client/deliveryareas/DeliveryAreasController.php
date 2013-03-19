<?php namespace App\Controllers\Api\Frontend\Client;

use Input;
use Validator;

use App\Models\DeliveryAreaModel;

class DeliveryAreasController extends ApiController
{


	public function route()
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// create new deliveryAreaModel
		$addressModelOfStore = $this->storeModel->addressModel;
		$deliveryAreaModel = new DeliveryAreaModel(array(
			'store_model_id' => $this->storeModel->id,
			'minimumValue' => 0.00,
			'minimumDuration' => 0,
			'city' => $addressModelOfStore->city,
			'district' => '',
			'postal' => $addressModelOfStore->postal
			));

		// save
		$deliveryAreaModel->save();

		// return as json
		return $deliveryAreaModel->toJson(JSON_NUMERIC_CHECK);
	}

	public function update($id)
	{
		// security
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// check input
		$input = Input::json();
		$rules = array(
			'minimumDuration'	=> 'numeric|required|min:0',
			'minimumValue'		=> 'numeric|required|min:0',
			'postal'			=> 'numeric|required|between:10000,99999',
			'city'				=> 'alpha_dash|required',
			'district'			=> 'alpha_dash'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// fetch deliveryAreaModel
		$deliveryAreaModel = DeliveryAreaModel::find($id);

		// verify owner
		$this->checkBelongsToThisStore($deliveryAreaModel->storeModel->id);

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// update
		$deliveryAreaModel->minimumDuration = $input['minimumDuration'];
		$deliveryAreaModel->minimumValue = $input['minimumValue'];
		$deliveryAreaModel->postal = $input['postal'];
		$deliveryAreaModel->city = $input['city'];
		$deliveryAreaModel->district = $input['district'];

		$deliveryAreaModel->save();

		return $this->respondWithStatus(204);
	}

	public function destroy()
	{
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// fetch deliveryAreaModel
		$deliveryAreaModel = DeliveryAreaModel::find($id);

		// verify owner
		$this->checkBelongsToThisStore($deliveryAreaModel->storeModel->id);

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		$deliveryAreaModel->delete();

		return $this->respondWithStatus(204);
	}	

}