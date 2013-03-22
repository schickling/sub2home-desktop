<?php namespace App\Controllers\Api\Frontend\Client\Bankaccounts;

use App\Controllers\Api\Frontend\Client\ApiController;
use Input;
use Request;

use App\Models\BankaccountModel;


class UpdateController extends ApiController
{

	/**
	 * @PUT('api/frontend/bankaccounts/{id}')
	 */
	public function route()
	{
		
		// check input
		$input = Input::json();
		$rules = array(
			'name'				=> 'required',
			'bankName'			=> 'required',
			'bankCodeNumber'	=> 'numeric|required|min:0',
			'accountNumber'		=> 'numeric|required|min:0'
			);

		$this->validateInput($rules);

		// fetch bankaccountModel
		$bankaccountModel = $this->getResourceModel();

		// update
		$bankaccountModel->name = $input['name'];
		$bankaccountModel->bankName = $input['bankName'];
		$bankaccountModel->bankCodeNumber = $input['bankCodeNumber'];
		$bankaccountModel->accountNumber = $input['accountNumber'];

		$bankaccountModel->save();


		return $this->respond(204);
	}


	protected function getClientModelIdFromResourceModel()
	{
		$bankaccountModel = $this->getResourceModel();

		return $bankaccountModel->client_model_id;
	}

	protected function fetchResourceModel() {
		$id = Request::segment(4);
		return BankaccountModel::find($id);
	}


}