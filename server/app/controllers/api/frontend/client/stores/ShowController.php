<?php namespace App\Controllers\Api\Frontend\Client\Stores;

use App\Controllers\Api\Frontend\Client\ApiController;
use App\Models\StoreModel;
use Request;

/**
* 
*/
class ShowController extends ApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}')
	 */
	public function route()
	{
		$storeModel = $this->getResourceModel();

		$storeModel->setHidden((array(
			'paymentPaypalAuthHeader',
			'created_at',
			'updated_at',
			'isActive',
			'client_model_id',
			'commissionRate',
			'id'
			)));

		return $storeModel->toJson(JSON_NUMERIC_CHECK);
	}

	protected function getClientModelIdFromResourceModel()
	{
		$storeModel = $this->getResourceModel();

		return $storeModel->client_model_id;
	}

	protected function fetchResourceModel() {
		$storeAlias = Request::segment(4);
		return StoreModel::with(array(
								'deliveryAreasCollection',
								'deliveryTimesCollection',
								'invoicesCollection',
								'addressModel'))
							->where('alias', $storeAlias)
							->where('isActive', true)
							->first();
	}


}