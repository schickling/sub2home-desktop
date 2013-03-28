<?php namespace App\Models;

/**
 * Menu component block class
 */
class MenuComponentBlockModel extends BaseModel
{
	public $timestamps = false;

	protected $hidden = array('menuModel_id', 'menuModel_type');

	protected $fillable = array('menuModel_id', 'menuModel_type', 'icon', 'smallImage', 'largeImage', 'placeholder');

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

	public function menuModel()
	{
		return $this->morphTo('menuModel');
	}


}