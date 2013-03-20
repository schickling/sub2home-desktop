<?php namespace App\Controllers\Api\Frontend\Authentification;

use Cache;
use App\Models\ClientModel;

class LogoutController extends ApiController
{

    public function route()
    {
    	$token = $this->getToken();

    	if (!$token) {
    		$this->throwException();
    	}

		Cache::forget($token);

        return $this->respondWithStatus(204);
    }


}