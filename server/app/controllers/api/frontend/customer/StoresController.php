<?php namespace App\Controllers\Api\Frontend\Customer;

use App\Models\StoreModel;

/**
* 
*/
class StoresController extends ApiController
{

	public function index()
	{
		$storesCollection = StoreModel::with(array(
			'deliveryAreasCollection',
			'deliveryTimesCollection'
			))
		->where('isOpen', true)
		->where('isActive', true)
		->get();

		return $storesCollection->toJson(JSON_NUMERIC_CHECK);

	}

	/**
	 * Returns the store as json object by his alias
	 * 
	 * @return string
	 */
	public function show($storeAlias)
	{
		$storeModel = StoreModel::with(array(
			'deliveryAreasCollection',
			'deliveryTimesCollection',
			'addressModel'))
		->where('alias', $storeAlias)
		->where('isActive', true)
		->first();

		if ($storeModel == null) {
			return $this->respondWithStatus(404);
		}

		if ($this->hasToken() and $storeModel->clientModel->id == $this->getClientModelIdFromToken()) {

			$storeModel->setHidden((array(
				'paymentPaypalAuthHeader',
				'created_at',
				'updated_at',
				'isActive',
				'client_model_id'
				)));
			$storeModel->invoicesCollection = $storeModel->invoicesCollection;

		}

		return $storeModel->toJson(JSON_NUMERIC_CHECK);
	}


}