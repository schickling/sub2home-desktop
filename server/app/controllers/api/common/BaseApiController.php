<?php namespace App\Controllers\Api\Common;

use App\Exceptions\ApiException;
use Controller;
use Response;
use Request;


/**
* 
*/
abstract class BaseApiController extends Controller
{

	/**
	 * convenient method for responses
	 * 
	 * @param  int          $statusCode
	 * @param  string       $message
	 * @return void
	 */
	protected function respondWithStatus($statusCode, $message = '') {

		$response = Response::make($message, $statusCode);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	protected function getToken()
	{
		return Request::header('Token');
	}

	protected function checkModelFound($model)
	{
		if (is_null($model)) {
			$this->throwException(404);
		}
	}

	protected function throwException($statusCode)
	{
		throw new ApiException($statusCode);
	}

}

