<?php namespace App\Controllers\Api\Frontend\Client\DeliveryTimes;

use App\Controllers\Api\Frontend\Client\ApiController;
use Input;
use Request;

use App\Models\DeliveryTimeModel;

class UpdateController extends ApiController
{

	/**
	 * @PUT('api/frontend/deliverytimes/{id}')
	 */
	public function route()
	{
		
		// check input
		$input = Input::all();
		$rules = array(
			'startMinutes'	=> 'numeric|required|between:0,1438',
			'endMinutes'	=> 'numeric|required|between:0,1439'
			);

		$this->validateInput($rules);

		if ($input['startMinutes'] >= $input['endMinutes']) {
			$this->throwException(400);
		}

		// fetch deliveryTimeModel
		$deliveryTimeModel = $this->getResourceModel();

		// update item
		$deliveryTimeModel->startMinutes = $input['startMinutes'];
		$deliveryTimeModel->endMinutes = $input['endMinutes'];

		$deliveryTimeModel->save();

		return $this->respond(204);
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