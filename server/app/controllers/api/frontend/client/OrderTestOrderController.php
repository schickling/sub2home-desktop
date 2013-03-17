<?php namespace App\Controllers\Api\Frontend\Client;

use App\Models\TestOrderModel;

/**
* 
*/
class OrderTestOrderController extends StoreRelatedApiController
{
	
	/**
	 * @POST('api/frontend/stores/{alias}/testorder')
	 */
	public function create()
	{
		TestOrderModel::generateTestOrderForStore($this->storeModel->id, true);

		return $this->respondWithStatus(204);
	}

}