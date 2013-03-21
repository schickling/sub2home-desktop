<?php namespace App\Controllers\Api\Frontend\Client\DeliveryAreas;

use App\Controllers\Api\Frontend\Client\ApiController;
use App\Models\DeliveryAreaModel;
use Request;

class DestroyController extends ApiController
{

	/**
	 * @DELETE('api/frontend/deliveryareas/{id}')
	 */
	public function route()
	{
		
		$deliveryAreaModel = $this->getResourceModel();
		$deliveryAreaModel->delete();

		return $this->respond(204);
	}


	protected function getClientModelIdFromResourceModel()
	{
		$deliveryAreaModel = $this->getResourceModel();
		$storeModel = $deliveryAreaModel->storeModel;

		return $storeModel->client_model_id;
	}

	protected function fetchResourceModel() {
		$id = Request::segment(4);
		return DeliveryAreaModel::find($id);
	}

}