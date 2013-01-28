<?php namespace App\Controllers\Api\Frontend;

use DeliveryTimeModel;
use Input;
use Request;

class DeliveryTimesController extends ApiController
{

	public function __construct() {
		$this->isAuthenicatedClient();
	}

	public function create()
	{
		$this->loadStoreModel();

		$input = Input::json();

		$deliveryTimeModel = new DeliveryTimeModel(array(
			'store_model_id' => $this->storeModel->id,
			'startMinutes' => 0,
			'endMinutes' => 60,
			'dayOfWeek' => $input->dayOfWeek
			));

		$deliveryTimeModel->save();

		return $deliveryTimeModel->toJson(JSON_NUMERIC_CHECK);
	}

	public function update()
	{
		$input = Input::json();
		$id = Request::segment(6);

		$deliveryTimeModel = DeliveryTimeModel::find($id);

		$deliveryTimeModel->startMinutes = $input->startMinutes;
		$deliveryTimeModel->endMinutes = $input->endMinutes;

		$deliveryTimeModel->save();
	}

	public function destroy()
	{
		$id = Request::segment(6);

		$deliveryTimeModel = DeliveryTimeModel::find($id);

		$deliveryTimeModel->delete();
	}	

}