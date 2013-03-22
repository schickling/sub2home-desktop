<?php namespace App\Controllers\Api\Frontend\Client\Clients;

use App\Controllers\Api\Frontend\Client\ApiController;
use Input;
use Hash;

use App\Models\ClientModel;


class ChangePasswordController extends ApiController
{

	/**
	 * @POST('api/frontend/clients/changepassword')
	 */
	public function route()
	{
		// authentication is implied by fetching client model id
		$clientModelId = $this->getClientModelIdFromToken();

		// fetch clientModel
		$clientModel = ClientModel::find($clientModelId);

		$this->checkModelFound($clientModel);


		// check input
		$input = Input::json();
		$rules = array(
			'currentPassword'	=> 'alpha_dash|required|min:8',
			'newPassword'		=> 'alpha_dash|required|min:8'
			);

		$this->validateInput($rules);

		// check if entered old password is correct
		if (!Hash::check($input['currentPassword'], $clientModel->hashedPassword)) {
			$this->throwException(400);
		}

		// save new password
		$clientModel->hashedPassword = Hash::make($input['newPassword']);
		$clientModel->save();


		return $this->respond(204);

	}

	protected function getClientModelIdFromResourceModel()
	{
		// authentication is implied by fetching client model id
		return $this->getClientModelIdFromToken();
	}


}