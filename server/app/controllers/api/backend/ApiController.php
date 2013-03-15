<?php namespace App\Controllers\Api\Backend;

use App\Controllers\Api\Common\BaseApiController;

use Response;

/**
* 
*/
class ApiController extends BaseApiController
{

	private $headers = array(
		'Access-Control-Allow-Origin' => 'http://backend.sub2home.dev',
		'Access-Control-Allow-Methods' => 'GET, PUT, POST, DELETE, OPTIONS',
		'Access-Control-Allow-Headers' => 'Content-Type'
		);
	
	public function __construct()
	{
		$this->afterFilter(function($response) {
			$this->appendHeadersToResponse($response);
		});
	}

	public function options()
	{
		$response = Response::make(200);

		$this->appendHeadersToResponse($response);

		return $response;
	}

	private function appendHeadersToResponse($response)
	{
		foreach ($this->headers as $headerKey => $headerValue) {
			$response->headers->set($headerKey, $headerValue);
		}
	}

}