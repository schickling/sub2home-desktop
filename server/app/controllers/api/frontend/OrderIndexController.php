<?php namespace App\Controllers\Api\Frontend;

use Input;

use App\Models\OrderModel;

/**
* 
*/
class OrderIndexController extends ApiController
{


	public function index()
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		$page = Input::get('page');
		$search = Input::get('search', '');
		$pageSize = 50;
		$offset = $page * $pageSize;

		if (empty($search)) {

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