<?php namespace App\Models;

/**
 * Custom Menu class
 *
 * A custom menu
 */
class CustomMenuModel extends BaseModel
{

	protected $table = 'custom_menu_models';
	

	public function menuModel()
	{
		return $this->morphTo('menuModel');
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