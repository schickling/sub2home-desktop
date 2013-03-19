<?php namespace App\Controllers\Api\Frontend\Client\Stores;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use App\Controllers\Services\Payment\PaypalService;

/**
* 
*/
class UpdatePaypalController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/updatepaypal')
	 */
	public function route()
	{

		$json = json_encode(array(
			'url' => PaypalService::getRequestPermissionUrl($this->storeModel->id)
			));

		return $json;
	}


}