<?php namespace App\Controllers\Api\Frontend\Authentification;

use App\Controllers\Api\Common\BaseApiController;
use Cache;

use App\Models\ClientModel;



class LogoutController extends BaseApiController
{

    public function route()
    {
    	$token = $this->getToken();

    	if ($token) {
    		Cache::forget($token);
    	} else {
    		return $this->respondWithStatus(401);
    	}

    }


}