<?php namespace App\Controllers\Api\Frontend\Client;

use App\Models\MenuUpgradeModel;


class MenuUpgradesController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/menuupgrades')
	 */
	public function index()
	{
		
		$menuUpgradesCollection = MenuUpgradeModel::where('isPublished', true)
													->get();

		$storeModelId = $this->storeModel->id;

		foreach ($menuUpgradesCollection as $menuUpgradeModel) {
			$menuUpgradeModel->customPrice = $menuUpgradeModel->returnCustomPrice($storeModelId);			
		}

		return $menuUpgradesCollection->toJson(JSON_NUMERIC_CHECK);
	}

	/**
	 * @PUT('api/frontend/stores/{alias}/menuupgrades/{id}')
	 */
	public function update()
	{
		
		
	}


}