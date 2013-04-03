<?php namespace App\Controllers\Api\Frontend\Authentification;

use Cache;

class LogoutController extends AuthentificationController
{

    public function route()
    {
    	$token = $this->getToken();

    	if ( ! $token) {
    		$this->throwException(400);
    	}

    	$cacheKey = sprintf('session_%s', $token);
		Cache::forget($cacheKey);

        return $this->respond(204);
    }


}