<?php namespace App\Controllers\Api\Backend;

use App\Controllers\Api\BaseApiController;

/**
* 
*/
class ApiController extends BaseApiController
{
	
	public function __construct()
	{
		$this->afterFilter(function($response) {
			$response->headers->set('Access-Control-Allow-Origin', 'http://backend.sub2home.dev');
			$response->headers->set('Access-Control-Allow-Credentials', 'true');
			$response->headers->set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
			$response->headers->set('Access-Control-Allow-Headers', 'Content-Type');
		});
	}

}