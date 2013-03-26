<?php namespace App\Controllers\Api\Frontend\Client\DeliveryTimes;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
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

		$this->validateInput($rules);

		// create new deliveryTimeModel
		$deliveryTimeModel = new DeliveryTimeModel(array(
			'startMinutes' => 0,
			'endMinutes' => 60,
			'dayOfWeek' => $input['dayOfWeek']
			));

		// save
		$this->storeModel->deliveryTimesCollection()->save($deliveryTimeModel);

		// return as json
		return $deliveryTimeModel->toJson(JSON_NUMERIC_CHECK);
	}

}