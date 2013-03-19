<?php namespace App\Controllers\Api\Frontend\Client\DeliveryTimes;

use App\Controllers\Api\Frontend\Client\ApiController;
use App\Models\DeliveryTimeModel;
use Request;

class DestroyController extends ApiController
{

	/**
	 * @DELETE('api/frontend/deliverytimes/{id}')
	 */
	public function route()
	{
		
		$deliveryTimeModel = $this->getResourceModel();
		$deliveryTimeModel->delete();

		return $this->respondWithStatus(204);
	}


	protected function getClientModelIdFromResourceModel()
	{
		$deliveryTimeModel = $this->getResourceModel();
		$storeModel = $deliveryTimeModel->storeModel;

		return $storeModel->client_model_id;
	}

	protected function fetchResourceModel() {
		$id = Request::segment(4);
		return DeliveryTimeModel::find($id);
	}

}