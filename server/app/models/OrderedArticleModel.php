<?php

/**
 * Ordered Article class
 *
 * An orderd article
 */
class OrderedArticleModel extends BaseModel
{

	public $timestamps = false;

	public function delete()
	{
		throw new Exception("Can not delete an ordered article");
	}

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
	 * Returns the order
	 * 
	 * @return object
	 */
	public function orderedItemModel()
	{
		return $this->belongsTo('OrderedItemModel');
	}

	/**
	 * Returns the ingredients of the ordered article
	 * 
	 * @return array
	 */
	public function ingredientsCollection()
	{
		return $this->belongsToMany('IngredientModel');
	}

}