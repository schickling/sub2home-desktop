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

	protected $storeShouldBeLoaded = true;

	public function __construct() {

		if ($this->storeShouldBeLoaded) {
			$this->loadStoreModel();
		}

	}

	/**
	 * Checks if store exists and sets store as property
	 * 
	 * @return void
	 */
	private function loadStoreModel()
	{
		$storeAlias = Request::segment(4);
		$storeModel = StoreModel::where('alias', $storeAlias)
									->where('isActive', true)
									->first();

    	$this->checkModelFound($storeModel);

    	$this->storeModel = $storeModel;
	}


}