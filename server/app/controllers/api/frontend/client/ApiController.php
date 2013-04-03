<?php namespace App\Controllers\Api\Frontend\Client;

use App\Controllers\Api\Common\BaseApiController;
use App\Exceptions\ApiException;
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
			$this->throwException(401);
		}
	}

	protected function getClientModelIdFromToken()
	{
		// check if clientModelId was cached
		if ($this->clientModelId != 0) {
			return $this->clientModelId;
		}

		$cacheKey = sprintf('session_%s', $this->getToken());
		$clientModelId = Cache::get($cacheKey);

		if (!$clientModelId) {
			$this->throwException(401);
		}

        // cache client model it
		$this->clientModelId = $clientModelId;

		return $clientModelId;
	}

	abstract protected function getClientModelIdFromResourceModel();



    /*
     * Model helper methods (not needed collections)
     */

    protected function fetchResourceModel() {}

    protected function getResourceModel()
    {
    	// lazy load resource
    	if (is_null($this->resourceModel)) {
    		$this->resourceModel = $this->fetchResourceModel();
    	}

    	// check if found
    	$this->checkModelFound($this->resourceModel);

    	return $this->resourceModel;
    }

}