<?php namespace App\Controllers\Api\Backend;

use App\Models\ClientModel;

use Input;
use Validator;
use Hash;

/**
* 
*/
class ClientsController extends ApiController
{
	
	public function index()
	{
		$clientsCollection = ClientModel::with(array(
			'storesCollection',
			'storesCollection.addressModel',
			'addressModel'
			))->get();

		foreach ($clientsCollection as $clientModel) {
			$clientModel->setHidden(array());
			foreach ($clientModel->storesCollection as $storeModel) {
				$storeModel->setHidden(array());
			}
		}

		return $clientsCollection->toJson(JSON_NUMERIC_CHECK);
	}

	public function create()
	{
		
	}

	public function update($id)
	{
		$input = Input::all();

		$clientModel = ClientModel::find($id);

		if ($clientModel == null) {
			return $this->respond(404);
		}

		$clientModel->number = $input['number'];
		$clientModel->save();

		return $this->respond(204);
	}

	public function destroy($id)
	{
		$clientModel = ClientModel::find($id);

		if ($clientModel == null) {
			return $this->respond(404);
		}

		$clientModel->delete();

		return $this->respond(204);
	}	

	public function changePassword($id)
	{

		// fetch clientModel
		$clientModel = ClientModel::find($id);

		if ($clientModel == null) {
			return $this->respond(404);
		}


		// check input
		$input = Input::all();
		$rules = array(
			'password' => 'alpha_dash|required|min:8'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respond(400);
		}

		// save new password
		$clientModel->hashedPassword = Hash::make($input['password']);
		$clientModel->save();


		return $this->respond(204);

	}

}