<?php namespace App\Controllers\Api\Frontend\Client\MenuUpgrades;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use App\Models\MenuUpgradeModel;


class IndexController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/menuupgrades')
	 */
	public function route()
	{
		
		$menuUpgradesCollection = MenuUpgradeModel::where('isPublished', true)
													->get();

		$storeModelId = $this->storeModel->id;

		foreach ($menuUpgradesCollection as $menuUpgradeModel) {
			$customMenuModel = $menuUpgradeModel->returnCustomModel($storeModelId);

			$menuUpgradeModel->customPrice = $customMenuModel->price;			
			$menuUpgradeModel->buyed = $customMenuModel->buyed;
			$menuUpgradeModel->isActive = $customMenuModel->isActive;
		}


		return $menuUpgradesCollection->toJson(JSON_NUMERIC_CHECK);
	}


}