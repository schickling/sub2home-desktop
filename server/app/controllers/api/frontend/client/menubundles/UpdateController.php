<?php namespace App\Controllers\Api\Frontend\Client\MenuBundles;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use Input;
use Request;
use App\Models\MenuBundleModel;


class UpdateController extends StoreRelatedApiController
{

	/**
	 * @PUT('api/frontend/stores/{alias}/menubundles/{id}')
	 */
	public function route()
	{
		// check input
		$input = Input::json();
		$rules = array(
			'customPrice'		=> 'numeric|required|min:0',
			'isActive'			=> 'boolean|required'
			);

		$this->validateInput($rules);

		// fetch customMenuModel
		$id = Request::segment(6);

		$menuBundleModel = MenuBundleModel::find($id);
		$this->checkModelFound($menuBundleModel);

		$customMenuModel = $menuBundleModel->returnCustomModel($this->storeModel->id);

		// update
		$customMenuModel->isActive = $input['isActive'];
		$customMenuModel->price = $input['customPrice'];

		$customMenuModel->save();

		return $this->respond(204);
		
	}


}