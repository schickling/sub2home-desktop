<?php namespace App\Controllers\Api\Services;

use Input;
use Cache;
use StoreModel;
use Controller;
use Redirect;
use App;
use PaypalService;

/**
* 
*/
class PaypalController extends Controller
{

	public function saveToken()
	{
		$token = Input::get('request_token');
		$verificationCode = Input::get('verification_code');

		if (empty($token) || empty($verificationCode)) {
			return App::abort(404);
		}

		$store_model_id = Cache::get($token);

		if (!$store_model_id) {
			return App::abort(404);
		}

		$storeModel = StoreModel::find($store_model_id);

		$data = PaypalService::getAccessToken($token, $verificationCode);


		// Save tokens
		$storeModel->paypalToken = $data['token'];
		$storeModel->paypalTokensecret = $data['tokensecret'];

		// Enable payment method
		$storeModel->allowsPaymentPaypal = true;

		$storeModel->save();

		return Redirect::to($storeModel->alias . '/einstellungen');
	}

}