<?php

/**
 * Menu bundle class
 */
class MenuBundleModel extends MenuModel
{

	public $hidden = array('category_model_id', 'buyed', 'created_at', 'updated_at', 'isPublished', 'order');

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
	{
		$exists = $this->exists;

		// before initial save
		if (!$exists) {
			// Calculate new order concerning a category
			$numberOfArticles = ArticleModel::where('category_model_id', $this->category_model_id)->count();
			$numberOfMenuBundles = MenuBundleModel::where('category_model_id', $this->category_model_id)->count();
			$this->order = $numberOfArticles + $numberOfMenuBundles;
		}

		$ret = parent::save();

		// Check if menu bundle belongs to a category
		if ($this->category_model_id === 0) {
			throw new Exception("Menu bundle needs a category");
		}

		// after initial save
		if (!$exists) {

			// Create custom menus
			$storesCollection = StoreModel::all();
			foreach ($storesCollection as $storeModel) {
				$customMenuModel = new CustomMenuModel(array(
					'store_model_id' => $storeModel->id,
					'isActive' => true, // MOCK
					'menu_bundle_model_id' => $this->id,
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

		// Delete its menu component blocks
		foreach ($this->menuComponentBlocksCollection as $menuComponentBlockModel) {
			$menuComponentBlockModel->delete();
		}

		return parent::delete();
	}

	/**
	 * Returns the category of the bundle
	 * 
	 * @return object
	 */
	public function categoryModel()
	{
		return $this->belongsTo('CategoryModel');
	}

}
