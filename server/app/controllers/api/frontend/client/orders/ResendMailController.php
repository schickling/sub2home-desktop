<?php namespace App\Controllers\Api\Frontend\Client\Orders;

use App\Controllers\Api\Frontend\Client\ApiController;
use Queue;
use Request;

use App\Models\OrderModel;

/**
* 
*/
class ResendMailController extends ApiController
{
	
	/**
	 * @POST('api/frontend/orders/{id}/resendmail')
	 */
	public function route()
	{

		// fetch orderModel
		$orderModel = $this->getResourceModel();

		$jobData = array('order_model_id' => $orderModel->id);

		Queue::push('App\\Controllers\\Jobs\\Mail\\SendStoreOrderNotificationMailJob', $jobData);

		return $this->respond(204);
	}


	protected function getClientModelIdFromResourceModel()
	{
		$orderModel = $this->getResourceModel();
		$storeModel = $orderModel->storeModel;

		return $storeModel->client_model_id;
	}

	protected function fetchResourceModel() {
		$id = Request::segment(4);
		return OrderModel::find($id);
	}


}