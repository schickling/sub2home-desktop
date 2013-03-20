<?php namespace App\Controllers\Api\Frontend\Authentification;

use Cache;
use App\Models\ClientModel;

class CheckTokenController extends ApiController
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

        if (!$tokenIsCached) {
            $this->throwException();
        }

        return $this->respondWithStatus(204);
    }


}