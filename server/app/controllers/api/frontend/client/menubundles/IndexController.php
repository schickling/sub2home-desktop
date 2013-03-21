<?php namespace App\Controllers\Api\Frontend\Client\MenuBundles;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
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
			$customMenuModel = $menuBundleModel->returnCustomModel($storeModelId);

			$menuBundleModel->customPrice = $customMenuModel->price;			
			$menuBundleModel->buyed = $customMenuModel->buyed;
			$menuBundleModel->isActive = $customMenuModel->isActive;
		}

		return $menuBundlesCollection->toJson(JSON_NUMERIC_CHECK);
	}


}