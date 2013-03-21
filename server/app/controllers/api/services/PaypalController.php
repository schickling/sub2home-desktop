<?php namespace App\Controllers\Api\Services;

use App\Controllers\Api\Common\BaseApiController;
use Input;
use Cache;
use Validator;
use Redirect;
use App\Controllers\Services\Payment\PaypalService;

use App\Models\StoreModel;

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
			'request_token'		=> 'required',
			'verification_code'	=> 'required'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respond(404);
		}

		$token = Input::get('request_token');
		$verificationCode = Input::get('verification_code');


		// check if token still valid
		$store_model_id = Cache::get($token);

		if (!$store_model_id) {
			return $this->respond(400, 'Token expired');
		}


		// write data to store model
		$storeModel = StoreModel::find($store_model_id);

		$authHeader = PaypalService::createAuthHeaderForStore($token, $verificationCode);


		$storeModel->paymentPaypalAuthHeader = $authHeader;

		// Enable payment method
		$storeModel->allowsPaymentPaypal = true;

		$storeModel->save();

		return Redirect::to($storeModel->alias . '/einstellungen');
	}

	public function confirmOrder()
	{
		
	}

	public function notify()
	{
		
	}

}