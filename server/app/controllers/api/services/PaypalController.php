<?php namespace App\Controllers\Api\Services;

use App\Controllers\Api\BaseApiController;
use Input;
use Cache;
use StoreModel;
use Validator;
use Redirect;
use PaypalService;

/**
* 
*/
class PaypalController extends BaseApiController
{

	public function saveToken()
	{
		// validate input
		$input = Input::all();
		$rules = array(
			'request_token'		=> 'alpha_num|required',
			'verification_code'	=> 'alpha_num|required'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			$this->error(400, $validator->messages());
		}

		$token = Input::get('request_token');
		$verificationCode = Input::get('verification_code');


		// check if token still valid
		$store_model_id = Cache::get($token);

		if (!$store_model_id) {
			$this->error(404, 'Token expired');
		}


		// write data to store model
		$storeModel = StoreModel::find($store_model_id);

		$data = PaypalService::getAccessToken($token, $verificationCode);
		$storeModel->paypalToken = $data['token'];
		$storeModel->paypalTokensecret = $data['tokensecret'];

		// Enable payment method
		$storeModel->allowsPaymentPaypal = true;

		$storeModel->save();

		return Redirect::to($storeModel->alias . '/einstellungen');
	}

}