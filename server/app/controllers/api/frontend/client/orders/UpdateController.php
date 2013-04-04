<?php namespace App\Controllers\Api\Frontend\Client\Orders;

use App\Controllers\Api\Frontend\Client\ApiController;
use Input;
use Request;

use App\Models\OrderModel;

/**
* 
*/
class UpdateController extends ApiController
{
	
	/**
	 * @PUT('api/frontend/deliveryareas/{id}')
	 */
	public function route()
	{

		// check input
		$input = Input::all();
		$rules = array(
			'isDelivered' => 'required|boolean',
			);

		$this->validateInput($rules);

		// fetch orderModel
		$orderModel = $this->getResourceModel();

		// update
		$orderModel->isDelivered = $input['isDelivered'];

		$orderModel->save();

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