<?php namespace App\Controllers\Api\Common;

use Controller;
use Response;


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

}

