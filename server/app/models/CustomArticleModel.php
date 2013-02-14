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

}