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

		$id = Request::segment(6);
		$menuBundleModel = MenuBundleModel::with(array(
			'menuComponentBlocksCollection',
			'menuComponentBlocksCollection.menuComponentOptionsCollection',
			'menuComponentBlocksCollection.menuComponentOptionsCollection.menuComponentOptionArticlesCollection'
			))->find($id);


		$this->checkModelFound($menuBundleModel);

		// get menuBundle price
		$menuBundleModel->price = $menuBundleModel->returnCustomPrice($this->storeModel->id);

		return $menuBundleModel->toJson(JSON_NUMERIC_CHECK);
	}



}