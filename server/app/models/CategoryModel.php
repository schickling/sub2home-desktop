<?php namespace App\Models;

/**
 * CategoryModel class
 *
 * Each article is assigned to one category.
 */
class CategoryModel extends BaseModel
{

	public $timestamps = false;

	protected $hidden = array('order');

	protected $fillable = array('order', 'title', 'smallImage', 'icon');

	protected $table = 'category_models';

	protected function beforeFirstSave()
	{
		// Calculate new order concerning a category
		$this->order = static::count();
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
		return $this->hasMany('App\\Models\\ArticleModel');
	}

	/**
	 * Returns the menu bundles of the category
	 * 
	 * @return object
	 */
	public function menuBundlesCollection()
	{
		return $this->hasMany('App\\Models\\MenuBundleModel');
	}

	/**
	 * Returns the items
	 * 
	 * @return object
	 */
	public function getSortedItemsCollectionAttribute()
	{
		$articles = $this->articlesCollection->isEmpty() ? array() : $this->articlesCollection->all();
		$menuBundles = $this->menuBundlesCollection->isEmpty() ? array() : $this->menuBundlesCollection->all();

		$sortedItems = array_merge($menuBundles, $articles);

		// sort itemsCollection
		usort($sortedItems, function($a, $b) {
			return $a->order > $b->order ? 1 : -1;
		});

		return $this->newCollection($sortedItems); 
	}
}