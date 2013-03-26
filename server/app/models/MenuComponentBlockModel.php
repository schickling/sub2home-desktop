<?php namespace App\Models;

/**
 * Menu component block class
 */
class MenuComponentBlockModel extends BaseModel
{
	public $timestamps = false;

	protected $hidden = array('menu_bundle_model_id', 'menu_upgrade_model_id');

	protected $fillable = array('menu_bundle_model_id', 'menu_upgrade_model_id', 'icon', 'smallImage', 'largeImage', 'placeholder');

	protected $table = 'menu_component_block_models';

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
		return $this->hasMany('App\\Models\\MenuComponentOptionModel');
	}

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


}