<?php namespace App\Controllers\Api;

use Controller;
use App;
use Validator;
use Request;
use Response;
use Cache;


/**
* 
*/
class BaseApiController extends Controller
{

    protected $statusCode = 200;
    protected $message;

    /**
     * convenient method for (error) responses
     * 
     * @param  int          $errorCode
     * @param  string       $message
     * @return void
     */
    protected function respondWithStatus($statusCode, $message = '') {

        $response = Response::make($message, $statusCode);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    protected function respondWithError()
    {
        return $this->respondWithStatus($this->statusCode, $this->message);
    }

    protected function reportError($statusCode, $message = '')
    {
        $this->statusCode = $statusCode;
        $this->message = $message;
    }

    protected function hasErrorOccured()
    {
        return $this->statusCode != 200;
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


    /**
     * Checks if the given token is still in cache
     * 
     * @return Response
     */
    protected function getClientModelIdFromToken()
    {

        if (!$this->hasToken()) {
            $this->reportError(401);
            return;
        }

        $token = Request::header('Token');
        $client_model_id = Cache::get($token);

        if (!$client_model_id) {
            $this->reportError(401);
            return;
        }

        return $client_model_id;

    }

    protected function hasToken() {
        $token = Request::header('Token');

        return $token != null;
    }

}

Validator::extend('boolean', function($attribute, $value, $parameters)
{
    return is_bool($value) or is_numeric($value);
});