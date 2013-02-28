<?php namespace App\Controllers\Services\Payment;

use URL;
use Cache;
use Config;
use Exception;

/**
* Paypal Payment controller
*/
class PaypalService implements PaymentInterface
{

	private static $productionApiUrl = 'https://svcs.paypal.com/';
	private static $sandboxApiUrl = 'https://svcs.sandbox.paypal.com/';
	private static $productionFrontendUrl = 'https://www.paypal.com/cgi-bin/webscr?';
	private static $sandboxFrontendUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr?';


	public static function pay($order = null)
	{
		return true;
	}

	/**
	 * Returns the URL to the permission form
	 * 
	 * @return string
	 */
	public static function getRequestPermissionUrl($store_model_id)
	{
		
		$callbackUrl = URL::route('api/services/paypal/savetoken');
		$params = sprintf('&callback=%s?call=GetAccessToken&requestEnvelope_errorLanguage=en_US&scope(0)=EXPRESS_CHECKOUT', $callbackUrl);

		$response = static::callApiWithoutAuthHeader('Permissions/RequestPermissions', $params);

		// Cache token with store id
		Cache::put($response->token, $store_model_id, 50);

		// Prepare URL
		$tokenUrl = static::getFrontendUrl() . 'cmd=_grant-permission&request_token=' . $response->token;

		return $tokenUrl;

	}

	/**
	 * Returns the auth header string
	 * 
	 * @param  string $token
	 * @param  string $verifier
	 * @return string
	 */
	public static function getAuthHeaderForStore($token, $verifier)
	{
		$params = sprintf('&token=%s&verifier=%s', $token, $verifier);
		$response = static::callApiWithoutAuthHeader('Permissions/GetAccessToken', $params);

		return PaypalOAuth::getAuthHeaderString($response->token, $response->tokenSecret);
	}


	
	private static function callApiWithoutAuthHeader($apiMethod, $params)
	{
		$header = array(
			'X-PAYPAL-SECURITY-USERID: ' . Config::get('payment.paypal.apiUsername'),
			'X-PAYPAL-SECURITY-PASSWORD: ' . Config::get('payment.paypal.apiPassword'),
			'X-PAYPAL-SECURITY-SIGNATURE: '. Config::get('payment.paypal.apiSignature')
			);

		return static::callApi($apiMethod, $params, $header);
	}


	private static function callApiWithAuthHeader($apiMethod, $params, $authHeader)
	{
		$header = array(
			'X-PAYPAL-AUTHORIZATION: ' . $authHeader
			);

		return static::callApi($apiMethod, $params, $header);
	}

	/**
	 * Makes a POST request to the paypal api and returns the result
	 * 
	 * @param  string $apiMethod    name of the api section
	 * @param  string $params		all post parameters
	 * @param  string $header		get parameters
	 * @return object         		response object
	 */
	private static function callApi($apiMethod, $params, $header)
	{
		$url = static::getApiUrl() . $apiMethod;

		// add header fields
		$standardHeader = array(
			'X-PAYPAL-APPLICATION-ID: APP-80W284485P519543T',
			'X-PAYPAL-REQUEST-DATA-FORMAT:	NV',
			'X-PAYPAL-RESPONSE-DATA-FORMAT:	JSON'
			);

		$header = array_merge($header, $standardHeader);
		
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_USERAGENT, 'cURL/PHP');

		$json = curl_exec($ch);
		curl_close($ch);

		$response = json_decode($json);

		if (isset($response->error)) {
			throw new Exception("Paypal request failed");
		}

		return $response;
	}



	private static function getApiUrl()
	{
		if (Config::get('payment.paypal.sandbox')) {
			return static::$sandboxApiUrl;
		} else {
			return static::$productionApiUrl;
		}
	}

	private static function getFrontendUrl()
	{
		if (Config::get('payment.paypal.sandbox')) {
			return static::$sandboxFrontendUrl;
		} else {
			return static::$productionFrontendUrl;
		}
	}

}