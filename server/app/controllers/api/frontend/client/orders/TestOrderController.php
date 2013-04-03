<?php namespace App\Controllers\Api\Frontend\Client\Orders;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use App\Controllers\Services\Order\TestOrderService;

/**
* 
*/
class TestOrderController extends StoreRelatedApiController
{
	
	/**
	 * @POST('api/frontend/stores/{alias}/testorder')
	 */
	public function route()
	{
		TestOrderService::generateForStore($this->storeModel->id, true);

		return $this->respond(204);
	}

}