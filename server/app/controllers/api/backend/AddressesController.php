<?php namespace App\Controllers\Api\Backend;

use Input;

use App\Models\AddressModel;

/**
* 
*/
class AddresssController extends ApiController
{

	public function update($id)
	{
		$input = Input::json();

		$addressModel = AddressModel::find($id);

		if ($addressModel == null) {
			$this->error(404);
		}

		$addressModel->firstName = $input['firstName'];
		$addressModel->lastName = $input['lastName'];
		$addressModel->street = $input['street'];
		$addressModel->streetAdditional = $input['streetAdditional'];
		$addressModel->postal = $input['postal'];
		$addressModel->city = $input['city'];
		$addressModel->phone = $input['phone'];
		$addressModel->email = $input['email'];

		$addressModel->save();

		return $addressModel;
	}

}