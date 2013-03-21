<?php namespace App\Controllers\Api\Frontend\Client\DeliveryTimes;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use Validator;
use Input;

use App\Models\DeliveryTimeModel;

class CreateController extends StoreRelatedApiController
{

	/**
	 * @POST('api/frontend/stores/{alias}/deliverytimes')
	 */
	public function route()
	{
		// check input
		$input = Input::json();
		$rules = array(
			'dayOfWeek'	=> 'numeric|required|between:0,6'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respond(400, $validator->messages());
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

}