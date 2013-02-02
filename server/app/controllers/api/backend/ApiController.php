<?php namespace App\Controllers\Api\Backend;

use Controller;
use App;

/**
* 
*/
class ApiController extends Controller
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


	/**
	 * Catch-all method for requests that can't be matched.
	 *
	 * @param  string    $method
	 * @param  array     $parameters
	 * @return Response
	 */
	public function __call($method, $parameters)
	{
		return App::abort(404);
	}

	protected function error($errorCode = 404) {
		App::abort($errorCode);
	}

}