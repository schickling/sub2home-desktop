<?php namespace App\Controllers\Api\Frontend\Client;

use Input;

use App\Models\OrderModel;

/**
* 
*/
class OrderIndexController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/orders/{id}')
	 */
	public function index()
	{

		$page = Input::get('page');
		$search = Input::get('search', '');
		$pageSize = 50;
		$offset = $page * $pageSize;

		if ($search == '') {

			$ordersCollection = $this->storeModel->ordersCollection()
													->with('addressModel')
													->orderBy('id', 'desc')
													->orderBy('created_at', 'desc')
													->skip($offset)
													->take($pageSize)
													->get();

		} else {
			
			$matchingOrdersCollectionById = $this->storeModel->ordersCollection()
																->with('addressModel')
																->where('id', $search)
																->get();

			// TODO include address search
			$ordersCollection = $matchingOrdersCollectionById;

		}

		return $ordersCollection->toJson(JSON_NUMERIC_CHECK);

	}


}