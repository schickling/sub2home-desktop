<?php namespace App\Controllers\Api\Frontend\Client\MenuBundles;

use App\Models\MenuBundleModel;


class IndexController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/menuupgrades')
	 */
	public function route()
	{
		
		$menuBundlesCollection = MenuBundleModel::where('isPublished', true)
													->get();

		$storeModelId = $this->storeModel->id;

		foreach ($menuBundlesCollection as $menuBundleModel) {
			$menuBundleModel->customPrice = $menuBundleModel->returnCustomPrice($storeModelId);			
		}

		return $menuBundlesCollection->toJson(JSON_NUMERIC_CHECK);
	}


}