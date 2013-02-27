<?php namespace App\Controllers\Api\Frontend;

use Input;
use Request;
use Validator;

use App\Models\DeliveryAreaModel;

class DeliveryAreasController extends ApiController
{


	public function create()
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// create new deliveryAreaModel
		$deliveryAreaModel = new DeliveryAreaModel(array(
			'store_model_id' => $this->storeModel->id,
			'minimumValue' => 0.00,
			'minimumDuration' => 0,
			'description' => '',
			'postal' => $this->storeModel->addressModel->postal
			));

		// save
		$deliveryAreaModel->save();

		// return as json
		return $deliveryAreaModel->toJson(JSON_NUMERIC_CHECK);
	}

	public function update()
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
			'description'		=> 'alpha_dash|required'
			);

		$validator = Validator::make(get_object_vars($input), $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// fetch deliveryAreaModel
		$id = Request::segment(6);
		$deliveryAreaModel = DeliveryAreaModel::find($id);

		// verify owner
		$this->checkBelongsToThisStore($deliveryAreaModel->storeModel->id);

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// update
		$deliveryAreaModel->minimumDuration = $input->minimumDuration;
		$deliveryAreaModel->minimumValue = $input->minimumValue;
		$deliveryAreaModel->postal = $input->postal;
		$deliveryAreaModel->description = $input->description;

		$deliveryAreaModel->save();
	}

	public function destroy()
	{
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// fetch deliveryAreaModel
		$id = Request::segment(6);
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