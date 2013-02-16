<?php namespace App\Controllers\Api;

use Controller;
use App;
use Validator;
use Request;
use Cache;


/**
* 
*/
class BaseApiController extends Controller
{

    /**
     * Wrapper around app's abort method
     * 
     * @param  int          $errorCode
     * @param  string       $message
     * @return void
     */
    protected function error($errorCode, $message = null) {
        App::abort($errorCode, $message);
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
            $this->error(401);
        }

        $token = Request::header('Token');
        $client_model_id = Cache::get($token);

        if (!$client_model_id) {
            $this->error(401);
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
    return is_bool($value) || is_numeric($value);
});