<?php namespace App\Models;

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
		return $this->hasMany('App\\Models\\MenuComponentBlockModel');
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

			$customMenuModel = new CustomMenuModel(array(
									'store_model_id' => $store_model_id,
									'price' => $this->price
									));
			$this->customMenusCollection()->save($customMenuModel);
		}

		return $customMenuModel;
	}


	/**
	 * Returns the custom menus
	 * 
	 * @return object
	 */
	public function customMenusCollection()
	{
		return $this->morphMany('App\\Models\\CustomMenuModel', 'menuModel');
	}

}
