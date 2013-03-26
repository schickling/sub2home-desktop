<?php namespace App\Models;

/**
 * Custom Menu class
 *
 * A custom menu
 */
class CustomMenuModel extends CustomModel
{

	protected $table = 'custom_menu_models';

	public function menuModel()
	{
		return $this->morphTo('menuModel');
	}

}