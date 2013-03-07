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
		$callbackUrl = URL::secure('api/services/paypal/savetoken');
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
		$storeModel = $orderModel->storeModel;
		$addressModel = $orderModel->addressModel;

		$returnUrl = URL::secure('api/services/paypal/confirmorder');
		$cancelUrl = URL::secure($storeModel->alias . '/einstellungen');
		$notifyUrl = URL::secure('api/services/paypal/notify');
		$params = array(
			'METHOD'							=> 'SetExpressCheckout',
			'PAYMENTREQUEST_0_AMT'				=> '100',
			'RETURNURL'							=> $returnUrl,
			'CANCELURL'							=> $cancelUrl,
			'LOCALECODE'						=> 'DE',
			'ADDROVERRIDE'						=> '1',
			'ALLOWNOTE'							=> '0',
			'REQBILLINGADDRESS'					=> '1',
			'LOGOIMG'							=> 'https://www.paypal.com/de_DE/DE/i/logo/logo_150x65.gif',
			'CARTBORDERCOLOR'					=> '#FFFFFF',
			'BRANDNAME'							=> 'Subway ' . $storeModel->title,
			'CUSTOMERSERVICENUMBER'				=> '03297328',
			// address
			'PAYMENTREQUEST_0_SHIPTONAME'		=> $addressModel->firstName . ' ' . $addressModel->lastName,
			'PAYMENTREQUEST_0_SHIPTOSTREET'		=> $addressModel->street,
			'PAYMENTREQUEST_0_SHIPTOSTREET2'	=> $addressModel->streetAdditional,
			'PAYMENTREQUEST_0_SHIPTOCITY'		=> $addressModel->city,
			'PAYMENTREQUEST_0_SHIPTOCOUNTRY'	=> 'DE',
			'PAYMENTREQUEST_0_SHIPTOZIP'		=> $addressModel->postal,
			'PAYMENTREQUEST_0_SHIPTOPHONENUM'	=> $addressModel->phone,
			'PAYMENTREQUEST_0_NOTIFYURL'		=> $notifyUrl
			);

		$cartParams = static::buildCartParameters($orderModel);
		$params = array_merge($params, $cartParams);

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
			'X-PAYPAL-REQUEST-DATA-FORMAT: NV',
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

		
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $parameterString);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_USERAGENT, 'cURL/PHP');

		$response = curl_exec($ch);
		curl_close($ch);

		// var_dump($response);

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

	private static function buildCartParameters($orderModel)
	{

		$cartParams = array(
			'PAYMENTREQUEST_0_AMT'				=> $orderModel->total,
			'PAYMENTREQUEST_0_ITEMAMT'			=> $orderModel->total,
			'PAYMENTREQUEST_0_PAYMENTACTION'	=> 'Sale',
			'PAYMENTREQUEST_0_INVNUM'			=> $orderModel->id,
			'PAYMENTREQUEST_0_CURRENCYCODE'		=> 'EUR'
			);

		$index = 0;

		foreach ($orderModel->orderedItemsCollection as $orderedItemModel) {
			$cartParams['L_PAYMENTREQUEST_0_NAME' . $index] = 'Test Artikel';
			$cartParams['L_PAYMENTREQUEST_0_DESC' . $index] = 'Beschreibung';
			$cartParams['L_PAYMENTREQUEST_0_AMT' . $index] = $orderedItemModel->total / $orderedItemModel->amount;
			$cartParams['L_PAYMENTREQUEST_0_QTY' . $index] = $orderedItemModel->amount;

			$index++;
		}

		return $cartParams;
	}

}