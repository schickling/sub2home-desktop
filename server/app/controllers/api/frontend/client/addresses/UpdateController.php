<?php namespace App\Controllers\Api\Frontend\Client\Addresses;

use App\Controllers\Api\Frontend\Client\ApiController;
use Input;
use Request;

use App\Models\AddressModel;
use App\Models\ClientModel;
use App\Models\StoreModel;


class UpdateController extends ApiController
{

	/**
	 * @PUT('api/frontend/addresses/{id}')
	 */
	public function route()
	{

		// check input
		$input = Input::json();
		$rules = array(
			'firstName'			=> 'alpha_dash|required',
			'lastName'			=> 'alpha_dash|required',
			'street'			=> 'required',
			'postal'			=> 'numeric|required|between:10000,99999',
			'city'				=> 'required',
			'phone'				=> 'alpha_num|required',
			'email'				=> 'email|required'
			);

		$this->validateInput($rules);

		// fetch addressModel
		$addressModel = $this->getResourceModel();

		// update
		$addressModel->firstName = $input['firstName'];
		$addressModel->lastName = $input['lastName'];
		$addressModel->street = $input['street'];
		$addressModel->streetAdditional = $input['streetAdditional'];
		$addressModel->postal = $input['postal'];
		$addressModel->city = $input['city'];
		$addressModel->phone = $this->fixPhoneNumber($input['phone']);
		$addressModel->email = $input['email'];

		$addressModel->save();


		return $this->respond(204);
	}

	private function fixPhoneNumber($phone)
	{
		// stringify
		$phone = strval($phone);

		if (substr($phone, 0, 1) != 0) {
			$phone = '0' . $phone;
		}

		return $phone;
	}


	/**
	 * Can belong to a client or a store model
	 */
	protected function getClientModelIdFromResourceModel()
	{
		$addressModel = $this->getResourceModel();
		$ownerModel = $addressModel->ownerModel;

		if ($ownerModel instanceof ClientModel) {
			return $ownerModel->id;
		}

		if ($ownerModel instanceof StoreModel) {
			return $ownerModel->client_model_id;
		}

	}

	protected function fetchResourceModel() {
		$id = Request::segment(4);
		return AddressModel::find($id);
	}


}