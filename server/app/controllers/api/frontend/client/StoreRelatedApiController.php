<?php namespace App\Controllers\Api\Frontend\Client;

use Request;
use App\Exceptions\NotFoundException;

use App\Models\StoreModel;


/**
* 
*/
abstract class StoreRelatedApiController extends ApiController
{

	protected $storeModel;

	protected function getClientModelIdFromResourceModel()
	{
		$storeAlias = Request::segment(4);
		$storeModel = StoreModel::where('alias', $storeAlias)
									->where('isActive', true)
									->first();

		if (is_null($storeModel)) {
			throw new NotFoundException();
		}

		// cache store model id
		$this->storeModel = $storeModel;

		return $storeModel->client_model_id;
	}

}