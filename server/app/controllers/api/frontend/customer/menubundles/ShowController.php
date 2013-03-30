<?php namespace App\Controllers\Api\Frontend\Customer\MenuBundles;

use App\Controllers\Api\Frontend\Customer\ItemApiController;
use Request;

use App\Models\MenuBundleModel;

/**
* 
*/
class ShowController extends ItemApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/menubundles/{id}')
	 */
	public function route()
	{

		$id = Request::segment(6);
		$menuBundleModel = MenuBundleModel::with(array(
												'menuComponentBlocksCollection',
												'menuComponentBlocksCollection.menuComponentOptionsCollection',
												'menuComponentBlocksCollection.menuComponentOptionsCollection.menuComponentOptionArticlesCollection' => function($query)
												{
													$query->where('isPublished', true);
												}
												))
											->where('isPublished', true)
											->find($id);


		$this->checkModelFound($menuBundleModel);


		$customMenuBundleModel = $menuBundleModel->returnCustomModel($this->storeModel->id);

		if ( ! $customMenuBundleModel->isActive) {
			$this->throwException(404);
		}

		// set custom price
		$menuBundleModel->price = $customMenuBundleModel->price;

		// prepare menu components
		$menuComponentBlocksCollection = $menuBundleModel->menuComponentBlocksCollection;
		$this->sortOutInactiveArticles($menuComponentBlocksCollection);

		if ($menuComponentBlocksCollection->isEmpty()) {
			$this->throwException(404);
		}

		return $menuBundleModel->toJson(JSON_NUMERIC_CHECK);
	}



}