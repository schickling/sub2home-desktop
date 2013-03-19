<?php namespace App\Controllers\Api\Frontend\Authentification;

use App\Controllers\Api\Common\BaseApiController;
use Cache;

use App\Models\ClientModel;



class CheckTokenController extends BaseApiController
{

    /**
     * Just wraps the getClientModelIdFromToken method and suppresses output
     * 
     * @return Response
     */
    public function route()
    {
    	$token = $this->getToken();
    	$tokenIsCached = Cache::has($token);

    	if ($tokenIsCached) {
	    	return $this->respondWithStatus(200);
    	} else {
	    	return $this->respondWithStatus(401);
    	}


    }


}