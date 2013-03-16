<?php namespace App\Controllers\Api\Frontend\Client;

use Validator;
use Input;

use App\Models\DeliveryTimeModel;

class DeliveryTimesController extends ApiController
{

	public function create()
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// check input
		$input = Input::json();
		$rules = array(
			'dayOfWeek'	=> 'numeric|required|between:0,6'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// create new deliveryTimeModel
		$deliveryTimeModel = new DeliveryTimeModel(array(
			'store_model_id' => $this->storeModel->id,
			'startMinutes' => 0,
			'endMinutes' => 60,
			'dayOfWeek' => $input['dayOfWeek']
			));

		// save
		$deliveryTimeModel->save();

		// return as json
		return $deliveryTimeModel->toJson(JSON_NUMERIC_CHECK);
	}

	public function update($id)
	{
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// check input
		$input = Input::json();
		$rules = array(
			'startMinutes'	=> 'numeric|required|between:0,1438',
			'endMinutes'	=> 'numeric|required|between:0,1439'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		if ($input['startMinutes'] >= $input['endMinutes']) {
			return $this->respondWithStatus(400, 'endMinutes must be bigger then startMinutes');
		}

		// fetch deliveryTimeModel
		$deliveryTimeModel = DeliveryTimeModel::find($id);

		// verify owner
		$this->checkBelongsToThisStore($deliveryTimeModel->storeModel->id);

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// update item
		$deliveryTimeModel->startMinutes = $input['startMinutes'];
		$deliveryTimeModel->endMinutes = $input['endMinutes'];

		$deliveryTimeModel->save();
	}

	public function destroy($id)
	{
		$this->checkAuthentification();
		
		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// fetch deliveryTimeModel
		$deliveryTimeModel = DeliveryTimeModel::find($id);

		// verify owner
		$this->checkBelongsToThisStore($deliveryTimeModel->storeModel->id);

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		$deliveryTimeModel->delete();
	}	

}