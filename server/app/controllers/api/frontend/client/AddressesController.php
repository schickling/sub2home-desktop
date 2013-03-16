<?php namespace App\Controllers\Api\Frontend\Client;

use Validator;
use Input;

use App\Models\AddressModel;


class AddressesController extends ApiController
{

	public function update($id)
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
		$addressModel = AddressModel::find($id);

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


}