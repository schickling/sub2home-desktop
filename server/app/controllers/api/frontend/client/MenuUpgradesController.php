<?php namespace App\Controllers\Api\Frontend\Client;

use Illuminate\Database\Eloquent\Collection;

use App\Models\MenuBundleModel;
use App\Models\MenuUpgradeModel;


class MenuUpgradesController extends ApiController
{

	/**
	 * @Route('api/frontend/stores/{alias}/menuupgrades')
	 */
	public function index($storeAlias)
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		$menuUpgradesCollection = MenuUpgradeModel::where('isPublished', true)->get();

		foreach ($menuUpgradesCollection as $menuUpgradeModel) {
			$menuUpgradeModel->customPrice = $menuUpgradeModel->returnCustomPrice($this->storeModel->id);			
		}

		return $menuUpgradesCollection->toJson(JSON_NUMERIC_CHECK);
	}

	/**
	 * @Route('api/frontend/stores/{alias}/menuupgrades/{id}')
	 */
	public function update($storeAlias, $id)
	{
		
		
	}


}