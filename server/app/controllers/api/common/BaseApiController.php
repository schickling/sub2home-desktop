<?php namespace App\Controllers\Api\Common;

use App\Exceptions\ApiException;
use Controller;
use Response;
use Request;
use Eloquent;
use Validator;
use Input;


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
	final protected function respond($statusCode, $message = '') {

		$response = Response::make($message, $statusCode);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	final protected function getToken()
	{
		return Request::header('Token');
	}

	final protected function checkModelFound($model)
	{
		if (is_null($model) or !$model instanceof Eloquent) {
			$this->throwException(404);
		}
	}

	final protected function validateInput($rules)
	{
		$input = Input::json();
		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			$this->throwException(400);
		}
	}

	final protected function throwException($statusCode)
	{
		throw new ApiException($statusCode);
	}

}

