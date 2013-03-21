<?php namespace App\Controllers\Api\Frontend\Client\Orders;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use App\Models\TestOrderModel;

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
		TestOrderModel::generateTestOrderForStore($this->storeModel->id, true);

		return $this->respond(204);
	}

}