<?php namespace App\Controllers\Api\Frontend;

use Illuminate\Database\Eloquent\Collection;

use App\Models\MenuBundleModel;
use App\Models\MenuUpgradeModel;


class MenusController extends ApiController
{

	public function index($storeAlias)
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		$menuUpgradesCollection = MenuUpgradeModel::where('isPublished', true)->get();
		$menuBundlesCollection = MenuBundleModel::where('isPublished', true)->get();

		$this->prepareMenusCollection($menuUpgradesCollection);
		$this->prepareMenusCollection($menuBundlesCollection);

		// merge arrays
		$menusArray = array_merge($menuUpgradesCollection->toArray(), $menuBundlesCollection->toArray());


		return json_encode($menusArray, JSON_NUMERIC_CHECK);
	}


	private function prepareMenusCollection($menusCollection)
	{
		foreach ($menusCollection as $menuModel) {
			$menuModel->customPrice = $menuModel->returnCustomPrice($this->storeModel->id);			
		}
	}



}