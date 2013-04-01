<?php namespace App\Controllers\Api\Frontend\Customer\Stores;

use App\Controllers\Api\Frontend\Customer\ApiController;
use App\Models\StoreModel;

/**
* 
*/
class IndexController extends ApiController
{

	protected $storeShouldBeLoaded = false;
	
	/**
	 * @GET('api/frontend/stores')
	 */
	public function route()
	{
		$storesCollection = StoreModel::with(array(
			'deliveryAreasCollection',
			'deliveryTimesCollection',
			'addressModel'
			))
		->where('isOpen', true)
		->where('isActive', true)
		->get();

		return $storesCollection->toJson(JSON_NUMERIC_CHECK);

	}


}