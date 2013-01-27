<?php

/**
 * Custom Article class
 *
 * A custom article.
 */
class CustomArticleModel extends BaseModel
{
	
	/**
	 * Returns the article
	 * 
	 * @return object
	 */
	public function articleModel()
	{
		return $this->belongsTo('ArticleModel');
	}

	/**
	 * Returns the store
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('StoreModel');
	}

}