<?php namespace App\Controllers\Api\Frontend\Authentification;

use Cache;

class CheckTokenController extends AuthentificationController
{

    /**
     * Just wraps the getClientModelIdFromToken method and suppresses output
     * 
     * @return Response
     */
    public function route()
    {

        $cacheKey = sprintf('session_%s', $this->getToken());
        $cacheHasKey = Cache::has($cacheKey);

        if ( ! $cacheHasKey) {
            $this->throwException(401);
        }

        return $this->respond(204);
    }


}