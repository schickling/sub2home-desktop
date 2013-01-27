<?php

/**
 * CategoryModel class
 *
 * Each article is assigned to one category.
 */
class CategoryModel extends BaseModel
{

	public $timestamps = false;

	public $hidden = array('order');

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
	{
		// Inital save
		if (!$this->exists) {

			// Calculate new order concerning a category
			$this->order = static::count();

		}

		return parent::save();
	}

	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Readjust order of other categories
		foreach (static::where('order', '>', $this->order)->get() as $categoryModel) {
			$categoryModel->order = $categoryModel->order - 1;
			$categoryModel->save();
		}

		// Delete all belonging articlesCollection
		foreach ($this->articlesCollection as $articleModel) {
			$articleModel->delete();
		}

		// Delete all belonging menu bundles
		foreach ($this->menuBundlesCollection as $menuBundleModel) {
			$menuBundleModel->delete();
		}

		return parent::delete();
	}

	/**
	 * Returns the articlesCollection of the category
	 * 
	 * @return object
	 */
	public function articlesCollection()
	{
		return $this->hasMany('ArticleModel');
	}

	/**
	 * Returns the menu bundles of the category
	 * 
	 * @return object
	 */
	public function menuBundlesCollection()
	{
		return $this->hasMany('MenuBundleModel');
	}

	/**
	 * Returns the items
	 * 
	 * @return object
	 */
	public function getOrderedItemsCollection()
	{
		$articles = $this->articlesCollection->isEmpty() ? array() : $this->articlesCollection->all();
		$menuBundles = $this->menuBundlesCollection->isEmpty() ? array() : $this->menuBundlesCollection->all();

		$orderedItems = array_merge($menuBundles, $articles);

		// sort itemsCollection
		usort($orderedItems, function($a, $b) {
			return $a->order > $b->order ? 1 : -1;
		});

		return $this->newCollection($orderedItems); 
	}
}