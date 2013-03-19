<?php namespace App\Controllers\Api\Frontend\Customer\Stores;

use App\Controllers\Api\Frontend\Customer\ApiController;
use App\Models\StoreModel;
use Request;

/**
* 
*/
class ShowController extends ApiController
{

	protected $storeShouldBeLoaded = false;

	/**
	 * @GET('api/frontend/stores/{alias}')
	 */
	public function route()
	{
		$storeAlias = Request::segment(4);
		$storeModel = StoreModel::with(array(
										'deliveryAreasCollection',
										'deliveryTimesCollection',
										'addressModel'))
									->where('alias', $storeAlias)
									->where('isActive', true)
									->first();

    	$this->checkModelFound($storeModel);

		return $storeModel->toJson(JSON_NUMERIC_CHECK);
	}


}