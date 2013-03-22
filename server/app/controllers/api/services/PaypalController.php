<?php namespace App\Controllers\Api\Services;

use App\Controllers\Api\Common\BaseApiController;
use Input;
use Cache;
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

		$this->validateInput($rules, $input);

		$token = Input::get('request_token');
		$verificationCode = Input::get('verification_code');


		// check if token still valid
		$store_model_id = Cache::get($token);

		if (!$store_model_id) {
			$this->throwException(400);
		}


		// write data to store model
		$storeModel = StoreModel::find($store_model_id);
		$this->checkModelFound($storeModel);

		// create auth header
		$authHeader = PaypalService::createAuthHeaderForStore($token, $verificationCode);

		// save auth header
		$storeModel->paymentPaypalAuthHeader = $authHeader;

		// Enable paypal payment method
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