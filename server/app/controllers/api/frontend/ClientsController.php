<?php namespace App\Controllers\Api\Frontend;

use Input;
use Hash;
use Validator;

use App\Models\ClientModel;


class ClientsController extends ApiController
{

	public function show()
	{
		// authentication is implied by fetching client model id
		$client_model_id = $this->getClientModelIdFromToken();

		$clientModel = ClientModel::with(array(
										'storesCollection',
										'storesCollection.invoicesCollection',
										'addressModel',
										'bankaccountModel'
									))
									->find($client_model_id);


		if ($clientModel == null) {
			return $this->respondWithStatus(401);
		}

		foreach ($clientModel->storesCollection as $storeModel) {
			$storeModel->numberOfUndoneOrders = $storeModel->ordersCollection()->where('isDelivered', false)->count();
		}

		
		return $clientModel->toJson(JSON_NUMERIC_CHECK);
	}


	public function changePassword()
	{
		// authentication is implied by fetching client model id
		$client_model_id = $this->getClientModelIdFromToken();

		// fetch clientModel
		$clientModel = ClientModel::find($client_model_id);

		if ($clientModel == null) {
			return $this->respondWithStatus(401);
		}


		// check input
		$input = Input::json();
		$rules = array(
			'currentPassword'	=> 'alpha_dash|required|min:8',
			'newPassword'		=> 'alpha_dash|required|min:8'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400);
		}

		// check if entered old password is correct
		if (!Hash::check($input['currentPassword'], $clientModel->hashedPassword)) {
			return $this->respondWithStatus(400);
		}

		// save new password
		$clientModel->hashedPassword = Hash::make($input['newPassword']);
		$clientModel->save();


		return $this->respondWithStatus(204);

	}


}