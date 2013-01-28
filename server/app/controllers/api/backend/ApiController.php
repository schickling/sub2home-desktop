<?php namespace App\Controllers\Api\Backend;

use Controller;

/**
* 
*/
class ApiController extends Controller
{
	
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

}