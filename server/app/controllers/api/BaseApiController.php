<?php namespace App\Controllers\Api;

use Controller;
use App;
use Validator;

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

}

Validator::extend('boolean', function($attribute, $value, $parameters)
{
    return is_bool($value) || is_numeric($value);
});