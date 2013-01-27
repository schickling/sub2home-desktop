<?php

/**
 * Menu component block class
 */
class MenuComponentBlockModel extends BaseModel
{
	public $timestamps = false;

	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Delete related menu component options
		foreach ($this->menuComponentOptionsCollection as $menuComponentOptionModel) {
			$menuComponentOptionModel->delete();
		}

		return parent::delete();
	}

	/**
	 * Returns the menu component option
	 * 
	 * @return object
	 */
	public function menuComponentOptionsCollection()
	{
		return $this->hasMany('MenuComponentOptionModel');
	}

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
	public function get_menu()
	{
		if ($this->menuUpgradeModel != null) {
			return $this->menuUpgradeModel;
		} elseif ($this->menuBundleModel != null) {
			return $this->menuBundleModel;
		} else {
			throw new Exception("Custom menu has no parent menu");
		}
	}

}