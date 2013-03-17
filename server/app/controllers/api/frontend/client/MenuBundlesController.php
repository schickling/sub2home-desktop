<?php namespace App\Controllers\Api\Frontend\Client;

use App\Models\MenuBundleModel;


class MenuBundlesController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/menuupgrades')
	 */
	public function index()
	{
		
		$menuBundlesCollection = MenuBundleModel::where('isPublished', true)
													->get();

		$storeModelId = $this->storeModel->id;

		foreach ($menuBundlesCollection as $menuBundleModel) {
			$menuBundleModel->customPrice = $menuBundleModel->returnCustomPrice($storeModelId);			
		}

		return $menuBundlesCollection->toJson(JSON_NUMERIC_CHECK);
	}

	/**
	 * @PUT('api/frontend/stores/{alias}/menuupgrades/{id}')
	 */
	public function update()
	{
		
		
	}


}