<?php namespace App\Controllers\Api\Frontend\Client\Orders;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use Input;

/**
* 
*/
class IndexController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/orders/{id}')
	 */
	public function route()
	{

		$page = Input::get('page');
		$search = Input::get('search', '');
		$pageSize = 50;
		$offset = $page * $pageSize;

		if ($search == '') {

			$ordersCollection = $this->storeModel->ordersCollection()
													->with(array(
														'addressModel',
														'creditModel'
														))
													->orderBy('id', 'desc')
													->orderBy('created_at', 'desc')
													->skip($offset)
													->take($pageSize)
													->get();

		} else {
			
			$matchingOrdersCollectionById = $this->storeModel->ordersCollection()
																->with(array(
																	'addressModel',
																	'creditModel'
																	))
																->where('id', $search)
																->get();

			// TODO include address search
			$ordersCollection = $matchingOrdersCollectionById;

		}

		return $ordersCollection->toJson(JSON_NUMERIC_CHECK);

	}


}