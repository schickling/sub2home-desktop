<?php

/**
 * Article class
 *
 * Any product of a store (subs, drinks, chips...) is represented as an article.
 * An article may include ingredientsCollection.
 */
class ArticleModel extends ItemModel
{

	public $hidden = array('category_model_id', 'buyed', 'created_at', 'updated_at', 'isPublished', 'order');

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
	{

		// before initial save
		if (!$this->exists) {
			// Calculate new order concerning a category
			$numberOfArticles = ArticleModel::where('category_model_id', $this->category_model_id)->count();
			$numberOfMenuBundles = MenuBundleModel::where('category_model_id', $this->category_model_id)->count();
			$this->order = $numberOfArticles + $numberOfMenuBundles;
		}

		// Check if article belongs to a category
		if ($this->category_model_id === 0) {
			throw new Exception("Menu bundle needs a category");
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

		$customArticleModel = $this->customArticlesCollection()->where('store_model_id', $store_model_id)->first();

		// lazy initialize
		if ($customArticleModel == null) {
			$customArticleModel = new CustomArticleModel(array(
									'store_model_id' => $store_model_id,
									'isActive' => true, // MOCK
									'article_model_id' => $this->id,
									'price' => $this->price
									));
			$customArticleModel->save();
		}

		return $customArticleModel;
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
