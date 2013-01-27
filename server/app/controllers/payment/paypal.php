<?php

/**
* Paypal Payment controller
*/
class Payment_Paypal_Controller implements Payment_Interface
{

	public function pay($order = null)
	{
		return true;
	}

	/**
	 * Returns the URL to the permission form
	 * 
	 * @return string
	 */
	public function request_permissions($store_id)
	{
		
		$callback_url = URL::to_route('paypal_get_access_token');
		$params = sprintf('&callback=%s?call=GetAccessToken&requestEnvelope_errorLanguage=en_US&scope(0)=EXPRESS_CHECKOUT', $callback_url);

		$response = $this->call_api('Permissions/RequestPermissions', $params);

		// Cache token with store id
		Cache::put($response->token, $store_id, 50);

		// Prepare URL
		$token_url = sprintf('https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_grant-permission&request_token=%s', $response->token);

		return $token_url;

	}

	/**
	 * Returns the token and tokenSecret
	 * 
	 * @param  string $token
	 * @param  string $verifier
	 * @return array
	 */
	public function get_access_token($token, $verifier)
	{
		$params = sprintf('&token=%s&verifier=%s', $token, $verifier);
		$response = $this->call_api('Permissions/GetAccessToken', $params);

		$data = array(
			'token' => $response->token,
			'tokensecret' => $response->tokenSecret
			);

		return $data;
	}

	/**
	 * Creates an OAuth HTTP header
	 * 
	 * @param  int $store_id
	 * @return string
	 */
	public function auth_header($store_id)
	{
		require_once(path('app') . 'libraries/paypal/oauth.php');

		$RequestArguments = '';

		$SignatureResult = GenSignature(PayPalAPIUserName, PayPalAPIPassword, $AccessToken, $TokenSecret, 'POST', $Endpoint, $RequestArguments);

		// GenSignature($key, $secret, $token, $token_secret, $httpMethod, $endpoint, $params)

		$TimeStamp = $SignatureResult['oauth_timestamp'];
		$Signature = $SignatureResult['oauth_signature'];

		$PayPalAuthorizationHeader = "timestamp=$TimeStamp,token=$AccessToken,signature=$Signature";
		
		return ($PayPalAuthorizationHeader);
	}

	/**
	 * Makes a request to the paypal api and returns the result
	 * 
	 * @param  string $api    name of the api section
	 * @param  string $params get parameters
	 * @return object         response object
	 */
	private function call_api($api, $params)
	{
		$url = 'https://svcs.sandbox.paypal.com/' . $api;

		$header = array(
			// sub2home paypal account
			'X-PAYPAL-SECURITY-USERID: schick_1352211802_biz_api1.gmail.com',
			'X-PAYPAL-SECURITY-PASSWORD: 1352211824',
			'X-PAYPAL-SECURITY-SIGNATURE: AJ5gKjXBo8EIT3ByK4yDysURsPRIA5KB.RU3.bMPBeu1W3C0g.aEnK3u',
			'X-PAYPAL-APPLICATION-ID: APP-80W284485P519543T',
			'X-PAYPAL-REQUEST-DATA-FORMAT:	NV',
			'X-PAYPAL-RESPONSE-DATA-FORMAT:	JSON'
			);

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_USERAGENT, 'cURL/PHP');

		$json = curl_exec($ch);
		$response = json_decode($json);
		curl_close($ch); 

		if (isset($response->error)) {
			throw new Exception("Paypal request failed");
		}

		return $response;
	}
}