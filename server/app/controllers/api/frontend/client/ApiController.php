<?php namespace App\Controllers\Api\Frontend\Client;

use App\Controllers\Api\Common\BaseApiController;
use App\Exceptions\NotAuthentificatedException;
use App\Exceptions\NotFoundException;
use Request;
use Cache;


/**
* 
*/
abstract class ApiController extends BaseApiController
{

	// cache client model id since its used sometimes
	protected $clientModelId = 0;

	// cache resource model since its needed for authentification and for content
	protected $resourceModel = null;

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
		if ($this->getClientModelIdFromToken() != $this->getClientModelIdFromResourceModel()) {
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

    abstract protected function getClientModelIdFromResourceModel();



    /*
     * Model helper methods
     */

    protected function fetchResourceModel() {}

    protected function getResourceModel()
    {
    	// lazy load resource
    	if (is_null($this->resourceModel)) {
    		$this->resourceModel = $this->fetchResourceModel();
    	}

    	// check if found
    	if (is_null($this->resourceModel)) {
    		throw new NotFoundException();
    	}

    	return $this->resourceModel;
    }

}