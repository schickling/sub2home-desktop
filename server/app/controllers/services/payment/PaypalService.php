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

	private static $livePermissionsApiUrl = 'https://svcs.paypal.com/Permissions/';
	private static $sandboxPermissionsApiUrl = 'https://svcs.sandbox.paypal.com/Permissions/';
	private static $liveApiUrl = 'https://api-3t.paypal.com/nvp';
	private static $sandboxApiUrl = 'https://api-3t.sandbox.paypal.com/nvp';
	private static $liveFrontendUrl = 'https://www.paypal.com/cgi-bin/webscr?';
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
		
		$url = static::getPermissionsApiUrl() . 'RequestPermissions';
		$callbackUrl = URL::route('api/services/paypal/savetoken');
		$params = array(
			'requestEnvelope_errorLanguage' => 'en_US',
			'scope'							=> 'EXPRESS_CHECKOUT',
			'callback'						=> $callbackUrl
			);

		$response = static::callApiWithoutAuthHeader($params, $url);
		$token = $response['token'];

		// Cache token with store id
		Cache::put($token, $store_model_id, 50);

		return static::getFrontendUrl() . 'cmd=_grant-permission&request_token=' . $token;
	}

	/**
	 * Returns the auth header string
	 * 
	 * @param  string $token
	 * @param  string $verifier
	 * @return string
	 */
	public static function createAuthHeaderForStore($token, $verifier)
	{
		$url = static::getPermissionsApiUrl() . 'GetAccessToken';
		$params = array(
			'token'		=> $token,
			'verifier'	=> $verifier
			);
		$response = static::callApiWithoutAuthHeader($params, $url);

		$token = $response['token'];
		$tokenSecret = $response['tokenSecret'];

		return PaypalOAuth::getAuthHeaderString($token, $tokenSecret);
	}


	public static function getCheckoutUrl($orderModel)
	{
		$params = array(
			'METHOD'				=> 'SetExpressCheckout',
			'PAYMENTREQUEST_0_AMT'	=> '100'
			);
		$authHeader = $orderModel->storeModel->paymentPaypalAuthHeader;

		$response = static::callApiWithAuthHeader($params, $authHeader);
		$token = $response['TOKEN'];

		return static::getFrontendUrl() . 'cmd=_express-checkout&token=' . $token;
	}


	
	private static function callApiWithoutAuthHeader($params, $url)
	{
		$header = array(
			'X-PAYPAL-SECURITY-USERID: ' . Config::get('payment.paypal.apiUsername'),
			'X-PAYPAL-SECURITY-PASSWORD: ' . Config::get('payment.paypal.apiPassword'),
			'X-PAYPAL-SECURITY-SIGNATURE: '. Config::get('payment.paypal.apiSignature'),
			'X-PAYPAL-REQUEST-DATA-FORMAT:	NV',
			'X-PAYPAL-RESPONSE-DATA-FORMAT:	NV'
			);

		return static::callApi($params, $header, $url);
	}


	private static function callApiWithAuthHeader($params, $authHeader)
	{
		$header = array(
			'X-PAYPAL-AUTHORIZATION: ' . $authHeader
			);
		$url = static::getApiUrl();

		return static::callApi($params, $header, $url);
	}

	/**
	 * Makes a POST request to the paypal api and returns the result
	 * 
	 * @param  array  $params		all post parameters
	 * @param  array  $header		get parameters
	 * @param  string $url			url
	 * @return object         		response object
	 */
	private static function callApi($params, $header, $url)
	{

		// add header fields
		$standardHeader = array(
			'X-PAYPAL-APPLICATION-ID: APP-80W284485P519543T'
			);

		$header = array_merge($header, $standardHeader);


		// add parameters
		$standardParams = array(
			'VERSION' => '96.0'
			);

		$params = array_merge($params, $standardParams);

		// encode parameters
		$parameterString = http_build_query($params);


		$parameterString = '&USER=klu-super_api1.web.de&PWD=WVH8TZ2F6K2625RN&SIGNATURE=ANXWFbRtRTdXYa6uZjBGgAt40W5OAb0ZvG8vv514Mx2cGRxGf.Oh3l3y&VERSION=96.0&METHOD=SetExpressCheckout&RETURNURL=http://shopsandbox.de/api/ec/?call=GetExpressCheckoutDetails&CANCELURL=http://shopsandbox.de/api/ec/&HDRIMG=https://www.paypal.com/de_DE/DE/i/logo/logo_150x65.gif&LOGOIMG=https://www.paypal.com/de_DE/DE/i/logo/logo_150x65.gif&BRANDNAME=PayPal Test Site&CUSTOMERSERVICENUMBER=0123456789&PAYMENTREQUEST_0_AMT=100.00&paymentrequest_0_currencycode=EUR&PAYMENTREQUEST_0_ITEMAMT=70.00&PAYMENTREQUEST_0_SHIPPINGAMT=15.00&PAYMENTREQUEST_0_HANDLINGAMT=10.00&PAYMENTREQUEST_0_TAXAMT=5.00&PAYMENTREQUEST_0_DESC=Description&paymentrequest_0_paymentaction=Sale&L_PAYMENTREQUEST_0_NAME0=Test article&L_PAYMENTREQUEST_0_DESC0=Description&L_PAYMENTREQUEST_0_AMT0=70.00&L_PAYMENTREQUEST_0_NUMBER0=123456&L_PAYMENTREQUEST_0_QTY0=1&L_PAYMENTREQUEST_0_TAXAMT0=5.00';

		
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $parameterString);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_USERAGENT, 'cURL/PHP');

		$response = curl_exec($ch);
		curl_close($ch);

		// decode name value pairs into array
		parse_str($response, $decodedResponse);

		if (isset($decodedResponse['ACK']) && $decodedResponse['ACK'] == 'Failure') {
			throw new Exception(sprintf('%s: %s', $decodedResponse['L_SHORTMESSAGE0'], $decodedResponse['L_LONGMESSAGE0']));
		}

		return $decodedResponse;
	}



	private static function getApiUrl()
	{
		if (Config::get('payment.paypal.sandbox')) {
			return static::$sandboxApiUrl;
		} else {
			return static::$liveApiUrl;
		}
	}

	private static function getPermissionsApiUrl()
	{
		if (Config::get('payment.paypal.sandbox')) {
			return static::$sandboxPermissionsApiUrl;
		} else {
			return static::$livePermissionsApiUrl;
		}
	}

	private static function getFrontendUrl()
	{
		if (Config::get('payment.paypal.sandbox')) {
			return static::$sandboxFrontendUrl;
		} else {
			return static::$liveFrontendUrl;
		}
	}

}