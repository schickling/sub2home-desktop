<?php

/**
 * Custom Menu class
 *
 * A custom menu
 */
class CustomMenuModel extends BaseModel
{
	
	/**
	 * Returns the menu upgrade
	 * 
	 * @return object
	 */
	public function menuUpgradeModel()
	{
		return $this->belongsTo('MenuUpgradeModel');
	}
	
	/**
	 * Returns the menu bundle
	 * 
	 * @return object
	 */
	public function menuBundleModel()
	{
		return $this->belongsTo('MenuBundleModel');
	}

	/**
	 * Returns the menu upgrade or menu bundle
	 * 
	 * @return object
	 */
	public function getMenu()
	{
		if ($this->menuUpgradeModel != null) {
			return $this->menuUpgradeModel;
		} elseif ($this->menuBundleModel != null) {
			return $this->menuBundleModel;
		} else {
			throw new Exception("Custom menu has no parent menu");
		}
	}

	/**
	 * Returns the store
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('StoreModel');
	}

}