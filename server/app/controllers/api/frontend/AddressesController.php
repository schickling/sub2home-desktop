<?php namespace App\Controllers\Api\Frontend;

use Validator;
use Input;


class AddressesController extends ApiController
{

	public function update()
	{
		$input = Input::json();
		$rules = array(
			'firstName'				=> 'alpha_dash|required',
			'lastName'				=> 'alpha_dash|required',
			'street'				=> 'required',
			'streetAdditional'		=> 'required',
			'postal'				=> 'numeric|required|between:10000,99999',
			'city'					=> 'required',
			'phone'					=> 'alpha_num|required',
			'email'					=> 'email|required',
			);

		$validator = Validator::make(get_object_vars($input), $rules);

		if ($validator->fails()) {
			$this->error(400, $validator->messages());
		}


		$this->loadStoreModel();
		$addressModel = $this->storeModel->addressModel;

		$addressModel->firstName = $input->firstName;
		$addressModel->lastName = $input->lastName;
		$addressModel->street = $input->street;
		$addressModel->streetAdditional = $input->streetAdditional;
		$addressModel->postal = $input->postal;
		$addressModel->city = $input->city;
		$addressModel->phone = $input->phone;
		$addressModel->email = $input->email;

		$addressModel->save();


		unset($addressModel->storeModel);


		return $addressModel->toJson(JSON_NUMERIC_CHECK);
	}


}