<?php namespace App\Controllers\Api\Frontend\Client;

use App\Controllers\Api\Common\BaseApiController;
use App\Exceptions\NotAuthentificatedException;
use Request;
use Cache;


/**
* 
*/
abstract class ApiController extends BaseApiController
{

	// cache client model id since its used sometimes
	protected $clientModelId = 0;

	/**
	 * run authentification on every route
	 */
	public function __construct() {

		$this->beforeFilter(function()
		{
			$this->checkAuthentification();
		});

	}

	/**
	 * check if client id of token and resource match
	 */
	protected function checkAuthentification()
	{
		if ($this->getClientModelIdFromToken() != $this->getClientModelIdFromResource()) {
			throw new NotAuthentificatedException();
		}
	}

    protected function getClientModelIdFromToken()
    {
    	if ($this->clientModelId != 0) {
    		return $this->clientModelId;
    	}

        $token = Request::header('Token');
        $clientModelId = Cache::get($token);

        if (!$clientModelId) {
            throw new NotAuthentificatedException();
        }

        // cache client model it
        $this->clientModelId = $clientModelId;

        return $clientModelId;
    }

    abstract protected function getClientModelIdFromResource();

}