<?php namespace App\Controllers\Api\Frontend\Client\DeliveryAreas;

use App\Controllers\Api\Frontend\Client\ApiController;
use Input;
use Request;

use App\Models\DeliveryAreaModel;

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
			'minimumDuration'	=> 'numeric|required|min:0',
			'minimumValue'		=> 'numeric|required|min:0',
			'postal'			=> 'numeric|required|between:10000,99999',
			'city'				=> 'required'
			);

		$this->validateInput($rules);

		// fetch deliveryAreaModel
		$deliveryAreaModel = $this->getResourceModel();

		// update
		$deliveryAreaModel->minimumDuration = $input['minimumDuration'];
		$deliveryAreaModel->minimumValue = $input['minimumValue'];
		$deliveryAreaModel->postal = $input['postal'];
		$deliveryAreaModel->city = $input['city'];
		$deliveryAreaModel->district = $input['district'];

		$deliveryAreaModel->save();

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