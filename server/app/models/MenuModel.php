<?php

/**
 * MenuModel base class
 *
 * Abstract class which is extended by upgrades or bundles
 */
abstract class MenuModel extends ItemModel
{
	
	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{

		// Delete all belonging custom menu upgrades
		$this->customMenuModelsCollection()->delete();

		return parent::delete();
	}

	/**
	 * Returns the component blocks of the menu
	 * 
	 * @return object
	 */
	public function menuComponentBlocksCollection()
	{
		return $this->hasMany('MenuComponentBlockModel');
	}

	/**
	 * Returns the custom menu respecting a specific store
	 * 
	 * @param  int $store_model_id
	 * @return object
	 */
	public function returnCustomModel($store_model_id)
	{
		$this->check();

		$customMenuModel = $this->customMenusCollection()->where('store_model_id', $store_model_id)->first();

		// lazy initialize
		if ($customMenuModel == null) {

			// check if menu is a bundle or an upgrade
			if ($this instanceof MenuBundleModel) {
				$menuModelType = 'menu_bundle_model_id';
			} else {
				$menuModelType = 'menu_upgrade_model_id';
			}

			$customMenuModel = new CustomMenuModel(array(
									'store_model_id' => $store_model_id,
									'isActive' => true, // MOCK
									$menuModelType => $this->id,
									'price' => $this->price
									));
			$customMenuModel->save();
		}

		return $customMenuModel;
	}

	/**
	 * Returns the custom menus
	 * 
	 * @return object
	 */
	public function customMenuModelsCollection()
	{
		return $this->hasMany('CustomMenuModel');
	}

}
