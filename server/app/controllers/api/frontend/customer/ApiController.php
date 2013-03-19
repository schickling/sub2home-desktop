<?php namespace App\Controllers\Api\Frontend\Customer;

use App\Controllers\Api\Common\BaseApiController;
use Request;

use App\Models\StoreModel;


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
		$this->storeModel = StoreModel::where('alias', $storeAlias)
										->where('isActive', true)
										->first();

    	$this->checkModelFound($this->storeModel);
	}


}