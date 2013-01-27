<?php

/**
 * Article class
 *
 * Any product of a store (subs, drinks, chips...) is represented as an article.
 * An article may include ingredientsCollection.
 */
class ArticleModel extends ItemModel
{

	public $hidden = array('category_model_id', 'buyed', 'created_at', 'updated_at', 'isPublished');

	/**
	 * Images paths
	 */
	public static $imageOriginalPath;
	public static $imageSmallPath;
	public static $imageBigPath;
	public static $publicImageSmallPath;
	public static $publicImageBigPath;

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

		$save = parent::save();

		// Check if article belongs to a category
		if ($this->category_model_id === 0) {
			throw new Exception("Menu bundle needs a category");
		}

		// after initial save
		if (!$exists) {

			// Create custom articles
			$storesCollection = StoreModel::all();
			foreach ($storesCollection as $storeModel) {
				$customArticleModel = new CustomArticleModel(array(
					'store_model_id' => $storeModel->id,
					'isActive' => true, // MOCK
					'article_model_id' => $this->id,
					'price' => $this->price
					));
				$customArticleModel->save();
			}

		}

		return $save;
	}
	
	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{

		// Delete relationship with related menu upgrades
		foreach ($this->menuUpgradesCollection as $menuUpgradeModel) {
			$menuUpgradeModel->pivot->delete();
		}

		// Delete relationship with related ingredientsCollection
		foreach ($this->ingredientsCollection as $ingredientModel) {
			$ingredientModel->pivot->delete();
		}

		// Delete all belonging custom articles
		foreach ($this->customArticlesCollection as $customArticleModel) {
			$customArticleModel->delete();
		}

		// Delete belonging images
		File::delete(ArticleModel::$imageOriginalPath . $this->image);
		File::delete(ArticleModel::$imageBigPath . $this->image);
		File::delete(ArticleModel::$imageSmallPath . $this->image);

		return parent::delete();
	}

	/**
	 * Returns the ingredientsCollection which the article allows
	 * 
	 * @return object
	 */
	public function ingredientsCollection()
	{
		return $this->belongsToMany('IngredientModel');
	}

	/**
	 * Returns the MenuComponentOptionsCollection which include this article
	 * 
	 * @return object
	 */
	public function menuComponentOptionsCollection()
	{
		return $this->belongsToMany('MenuComponentOptionModel');
	}

	/**
	 * Returns the menu upgrades which this article allows
	 *
	 * @return object
	 */
	public function menuUpgradesCollection()
	{
		return $this->belongsToMany('MenuUpgradeModel');
	}

	/**
	 * Returns the category of the article
	 * 
	 * @return object
	 */
	public function categoryModel()
	{
		return $this->belongsTo('CategoryModel');
	}

	/**
	 * Returns the custom articles of the article
	 * 
	 * @return object
	 */
	public function customArticlesCollection()
	{
		return $this->hasMany('CustomArticleModel');
	}

	/**
	 * Returns the custom article respecting a specific store
	 * 
	 * @param  int $store_model_id
	 * @return object
	 */
	public function returnCustomModel($store_model_id)
	{
		$this->check();

		return $this->customArticlesCollection()->where('store_model_id', $store_model_id)->first();
	}


	public function hasIngredientModel($ingredient_model_id)
	{
		foreach ($this->ingredientsCollection as $ingredientModel) {
			if ($ingredientModel->id == $ingredient_model_id) {
				return true;
			}
		}
		return false;
	}

}

// ArticleModel::$imageOriginalPath = path('public') . 'img/upload/original/';
// ArticleModel::$imageSmallPath = path('public') . 'img/upload/subs_small/';
// ArticleModel::$imageBigPath = path('public') . 'img/upload/subs_big/';
// ArticleModel::$publicImageSmallPath = URL::base() . '/img/upload/subs_small/';
// ArticleModel::$publicImageBigPath = URL::base() . '/img/upload/subs_big/';
