<?php namespace App\Controllers\Api\Frontend\Client;

use Validator;
use Input;
use Request;

use App\Models\BankaccountModel;


class BankaccountsController extends ApiController
{

	/**
	 * @PUT('api/frontend/bankaccounts/{id}')
	 */
	public function update($id)
	{
		
		// check input
		$input = Input::json();
		$rules = array(
			'name'				=> 'required',
			'bankName'			=> 'required',
			'bankCodeNumber'	=> 'numeric|required|min:0',
			'accountNumber'		=> 'numeric|required|min:0'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// fetch bankaccountModel
		$bankaccountModel = $this->getResourceModel();

		// update
		$bankaccountModel->name = $input['name'];
		$bankaccountModel->bankName = $input['bankName'];
		$bankaccountModel->bankCodeNumber = $input['bankCodeNumber'];
		$bankaccountModel->accountNumber = $input['accountNumber'];

		$bankaccountModel->save();


		return $this->respondWithStatus(204);
	}


	protected function getClientModelIdFromResourceModel()
	{
		$bankaccountModel = $this->getResourceModel();

		return $bankaccountModel->clientModel->id;
	}

	protected function fetchResourceModel() {
		$id = Request::segment(4);
		return BankaccountModel::find($id);
	}


}