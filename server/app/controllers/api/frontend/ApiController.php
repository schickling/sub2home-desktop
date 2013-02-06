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

	protected function af()
	{
		$this->afterFilter(function($response) {
			$response->headers->set('Access-Control-Allow-Origin', 'http://backend.sub2home.dev');
			$response->headers->set('Access-Control-Allow-Credentials', 'true');
			$response->headers->set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
			$response->headers->set('Access-Control-Allow-Headers', 'Content-Type');
		});
	}

}