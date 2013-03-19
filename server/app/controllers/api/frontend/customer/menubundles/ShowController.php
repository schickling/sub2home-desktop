<?php namespace App\Controllers\Api\Frontend\Customer\MenuBundles;

use App\Controllers\Api\Frontend\Customer\ApiController;
use Request;

use App\Models\MenuBundleModel;

/**
* 
*/
class ShowController extends ApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/menubundles/{id}')
	 */
	public function route()
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
		$menuBundleModel->price = $menuBundleModel->returnCustomPrice($this->storeModel->id);
		

		return $menuBundleModel->toJson(JSON_NUMERIC_CHECK);
	}



}