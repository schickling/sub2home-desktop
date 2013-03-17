<?php namespace App\Controllers\Api\Frontend\Client;

use Validator;
use Input;
use Request;

use App\Models\AddressModel;
use App\Models\ClientModel;
use App\Models\StoreModel;


class AddressesController extends ApiController
{

	/**
	 * @PUT('api/frontend/addresses/{id}')
	 */
	public function update()
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

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

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


		return $this->respondWithStatus(204);
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