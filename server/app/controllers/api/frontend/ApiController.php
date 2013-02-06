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
	protected function isAuthenicatedClient()
	{
		return true;
	}

}