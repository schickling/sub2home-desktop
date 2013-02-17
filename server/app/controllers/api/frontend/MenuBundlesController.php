<?php namespace App\Controllers\Api\Frontend;

use Request;

use App\Models\MenuBundleModel;

/**
* 
*/
class MenuBundlesController extends ApiController
{


	public function show()
	{
		$this->loadStoreModel();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		$menuBundleModelId = Request::segment(6);
		$menuBundleModel = MenuBundleModel::with(array(
			'menuComponentBlocksCollection',
			'menuComponentBlocksCollection.menuComponentOptionsCollection',
			'menuComponentBlocksCollection.menuComponentOptionsCollection.menuComponentOptionArticlesCollection'
			))->find($menuBundleModelId);


		if ($menuBundleModel == null) {
			return $this->respondWithStatus(404);
		}

		// get menuBundle price
		$menuBundleModel->price = $menuBundleModel->returnRealPrice($this->storeModel->id);
		

		return $menuBundleModel->toJson(JSON_NUMERIC_CHECK);
	}



}