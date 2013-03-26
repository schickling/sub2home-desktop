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
		$addressModelOfStore = $this->storeModel->addressModel;

		// create new deliveryAreaModel
		$deliveryAreaModel = new DeliveryAreaModel(array(
			'minimumValue' => 0.00,
			'minimumDuration' => 0,
			'city' => $addressModelOfStore->city,
			'district' => '',
			'postal' => $addressModelOfStore->postal
			));

		// save
		$this->storeModel->deliveryAreasCollection()->save($deliveryAreaModel);

		// return as json
		return $deliveryAreaModel->toJson(JSON_NUMERIC_CHECK);
	}


}