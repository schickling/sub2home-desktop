<?php namespace App\Controllers\Api\Frontend;

use Validator;
use Input;
use Request;

use App\Models\BankaccountModel;


class BankaccountsController extends ApiController
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
			'name'				=> 'alpha_dash|required',
			'bankName'			=> 'alpha_dash|required',
			'bankCodeNumber'	=> 'numeric|required|min:0',
			'accountNumber'		=> 'numeric|required|min:0'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// fetch bankaccountModel
		$id = Request::segment(4);
		$bankaccountModel = BankaccountModel::find($id);

		// verify owner
		if ($this->getClientModelIdFromToken() != $bankaccountModel->client_model_id) {
			return $this->respondWithStatus(401);
		}

		// update
		$bankaccountModel->name = $input['name'];
		$bankaccountModel->bankName = $input['bankName'];
		$bankaccountModel->bankCodeNumber = $input['bankCodeNumber'];
		$bankaccountModel->accountNumber = $input['accountNumber'];

		$bankaccountModel->save();


		return $bankaccountModel->toJson(JSON_NUMERIC_CHECK);
	}


}