<?php namespace App\Controllers\Api\Frontend;

use DeliveryAreaModel;
use Input;
use Request;

class DeliveryAreasController extends ApiController
{

	public function __construct() {
		$this->checkAuthentification();
	}

	public function create()
	{
		$this->loadStoreModel();

		$deliveryAreaModel = new DeliveryAreaModel(array(
			'store_model_id' => $this->storeModel->id,
			'minimumValue' => 0.00,
			'minimumDuration' => 0,
			'description' => '',
			'postal' => $this->storeModel->addressModel->postal
			));

		$deliveryAreaModel->save();

		return $deliveryAreaModel->toJson(JSON_NUMERIC_CHECK);
	}

	public function update()
	{
		$input = Input::json();
		$id = Request::segment(6);

		$deliveryAreaModel = DeliveryAreaModel::find($id);

		$deliveryAreaModel->minimumDuration = $input->minimumDuration;
		$deliveryAreaModel->minimumValue = $input->minimumValue;
		$deliveryAreaModel->postal = $input->postal;
		$deliveryAreaModel->description = $input->description;

		$deliveryAreaModel->save();
	}

	public function destroy()
	{
		$id = Request::segment(6);

		$deliveryAreaModel = DeliveryAreaModel::find($id);

		$deliveryAreaModel->delete();
	}	

}