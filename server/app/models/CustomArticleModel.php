<?php namespace App\Models;

/**
 * Custom Article class
 *
 * A custom article.
 */
class CustomArticleModel extends BaseModel
{

	protected $table = 'custom_article_models';
	
	/**
	 * Returns the article
	 * 
	 * @return object
	 */
	public function articleModel()
	{
		return $this->belongsTo('App\\Models\\ArticleModel');
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

	public function loadCustomIngredientPrices()
	{
		$articleModel = $this->articleModel;

		if ($articleModel->allowsIngredients) {
			$ingredientsCollection = $articleModel->ingredientsCollection;
			$store_model_id = $this->storeModel->id;

			foreach ($ingredientsCollection as $ingredientModel) {
				$ingredientModel->price = $ingredientModel->returnCustomPrice($store_model_id);
			}
		}
	}

}