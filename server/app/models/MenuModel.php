<?php

/**
 * MenuModel base class
 *
 * Abstract class which is extended by upgrades or bundles
 */
abstract class MenuModel extends ItemModel
{

	/**
	 * Images paths
	 */
	public static $imageOriginalPath;
	public static $imageSmallPath;
	public static $imageBigPath;
	public static $publicImageSmallPath;
	public static $publicImageBigPath;
	
	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{

		// Delete all belonging custom menu upgrades
		$this->customMenuModelsCollection()->delete();

		// Delete belonging images
		File::delete(static::$imageOriginalPath . $this->image);
		File::delete(static::$imageBigPath . $this->image);
		File::delete(static::$imageSmallPath . $this->image);

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
		return $this->customMenuModelsCollection()->where('store_model_id', $store_model_id)->first();
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

// MenuModel::$imageOriginalPath = path('public') . 'img/upload/original/';
// MenuModel::$imageSmallPath = path('public') . 'img/upload/menus_small/';
// MenuModel::$imageBigPath = path('public') . 'img/upload/menus_big/';
// MenuModel::$publicImageSmallPath = URL::base() . '/img/upload/menus_small/';
// MenuModel::$publicImageBigPath = URL::base() . '/img/upload/menus_big/';
