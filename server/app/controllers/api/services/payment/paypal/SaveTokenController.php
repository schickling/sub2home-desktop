<?php namespace App\Controllers\Api\Services\Payment\Paypal;

use App\Controllers\Api\Common\BaseApiController;
use Input;
use Cache;
use Redirect;
use App\Controllers\Services\Payment\PaypalService;

use App\Models\StoreModel;

/**
* 
*/
class SaveTokenController extends BaseApiController
{

	public function route()
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
		$cacheKey = sprintf('paypal_request_permission_%s', $token);
		$storeModelId = Cache::get($cacheKey);

		if (!$storeModelId) {
			$this->throwException(400);
		}


		// write data to store model
		$storeModel = StoreModel::find($storeModelId);
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

}