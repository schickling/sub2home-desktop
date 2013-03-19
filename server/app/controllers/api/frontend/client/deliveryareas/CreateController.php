<?php namespace App\Controllers\Api\Frontend\Client\DeliveryAreas;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use App\Models\DeliveryAreaModel;

class CreateController extends StoreRelatedApiController
{

	/**
	 * @POST('api/frontend/stores/{alias}/deliveryareas')
	 */
	public function route()
	{
		
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


}