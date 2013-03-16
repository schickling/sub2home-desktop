<?php namespace App\Controllers\Api\Frontend;

use Validator;
use Input;
use Request;

use App\Models\AddressModel;


class AddressesController extends ApiController
{

	public function update()
	{
		
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

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
		$id = Request::segment(6);
		$addressModel = AddressModel::find($id);

		// verify owner
		$this->checkBelongsToThisStore($addressModel->ownerModel->id);

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

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