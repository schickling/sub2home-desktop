<?php

/**
 * Menu upgrade class
 */
class MenuUpgradeModel extends MenuModel
{
	
	public $hidden = array('buyed', 'created_at', 'updated_at', 'isPublished');

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
	{
		$exists = $this->exists;
		$ret = parent::save();

		// Inital save
		if (!$exists) {

			// Create custom menus
			$storesCollection = StoreModel::all();
			foreach ($storesCollection as $storeModel) {
				$customMenuModel = new CustomMenuModel(array(
					'store_model_id' => $storeModel->id,
					'isActive' => true, // MOCK
					'menu_upgrade_model_id' => $this->id,
					'price' => $this->price
					));
				$customMenuModel->save();
			}

		}

		return $ret;
	}
	
	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Delete relationship with related articlesCollection
		foreach ($this->articlesCollection as $articleModel) {
			$articleModel->pivot->delete();
		}

		return parent::delete();
	}

	/**
	 * Returns the articlesCollection which allow this upgrade
	 * 
	 * @return object
	 */
	public function articlesCollection()
	{
		return $this->belongsToMany('ArticleModel');
	}

}
