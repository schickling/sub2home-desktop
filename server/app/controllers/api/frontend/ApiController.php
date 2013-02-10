<?php namespace App\Controllers\Api\Frontend;

use App\Controllers\Api\BaseApiController;
use Request;
use StoreModel;


/**
* 
*/
class ApiController extends BaseApiController
{
	protected $storeModel;

	/**
	 * Checks if store exists and sets store as property
	 * 
	 * @return void
	 */
	protected function loadStoreModel()
	{
		$storeAlias = Request::segment(4);
		$this->storeModel = StoreModel::where('alias', $storeAlias)->first();

    	if ($this->storeModel == null) {
    		$this->error(404);
    	}
	}

	/**
	 * verify!
	 * 
	 * @return boolean
	 */
	protected function isAuthentificatedClient()
	{
		// load store model if needed
		if (!$this->storeModel) {
			$this->loadStoreModel();
		}

		// get client id from store model
		$idFromStore = $this->storeModel->clientModel->id;

		// get client id from token
		$idFromToken = $this->getClientModelIdFromToken();

		return $idFromStore == $idFromToken;
	}


	protected function checkAuthentification()
	{
		if (!$this->isAuthentificatedClient()) {
			$this->error(401);
		}
	}


}