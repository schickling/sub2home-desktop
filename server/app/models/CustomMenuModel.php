<?php namespace App\Models;

/**
 * Custom Menu class
 *
 * A custom menu
 */
class CustomMenuModel extends BaseModel
{

	protected $table = 'custom_menu_models';
	
	/**
	 * Returns the menu upgrade
	 * 
	 * @return object
	 */
	public function menuUpgradeModel()
	{
		return $this->belongsTo('App\\Models\\MenuUpgradeModel');
	}
	
	/**
	 * Returns the menu bundle
	 * 
	 * @return object
	 */
	public function menuBundleModel()
	{
		return $this->belongsTo('App\\Models\\MenuBundleModel');
	}

	/**
	 * Returns the menu upgrade or menu bundle
	 * 
	 * @return object
	 */
	public function getMenuModelAttribute()
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
		return $this->belongsTo('App\\Models\\StoreModel');
	}

}