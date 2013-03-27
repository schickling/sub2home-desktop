<?php namespace App\Controllers\Api\Frontend\Client\MenuUpgrades;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use Input;
use Request;
use App\Models\MenuUpgradeModel;


class UpdateController extends StoreRelatedApiController
{

	/**
	 * @PUT('api/frontend/stores/{alias}/menuupgrades/{id}')
	 */
	public function route()
	{
		// check input
		$input = Input::all();
		$rules = array(
			'customPrice'		=> 'numeric|required|min:0',
			'isActive'			=> 'boolean|required'
			);

		$this->validateInput($rules);

		// fetch customMenuModel
		$id = Request::segment(6);

		$menuUpgradeModel = MenuUpgradeModel::find($id);
		$this->checkModelFound($menuUpgradeModel);

		$customMenuModel = $menuUpgradeModel->returnCustomModel($this->storeModel->id);

		// update
		$customMenuModel->isActive = $input['isActive'];
		$customMenuModel->price = $input['customPrice'];

		$customMenuModel->save();

		return $this->respond(204);
		
	}


}