<?php namespace App\Models;

/**
 * Ordered Article class
 *
 * An orderd article
 */
class OrderedArticleModel extends BaseModel
{

	public $timestamps = false;

	protected $table = 'ordered_article_models';

	protected $hidden = array(
		'article_model_id',
		'ordered_item_model_id'
		);

	public function delete()
	{
		$this->throwException('Can not delete an ordered article');
	}

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
	 * Returns the order
	 * 
	 * @return object
	 */
	public function orderedItemModel()
	{
		return $this->belongsTo('App\\Models\\OrderedItemModel');
	}

	/**
	 * Returns the ingredients of the ordered article
	 * 
	 * @return array
	 */
	public function ingredientsCollection()
	{
		return $this->belongsToMany('App\\Models\\IngredientModel');
	}

	public function getHasIngredientsAttribute()
	{
		return $this->articleModel->allowsIngredients and ! $this->ingredientsCollection->isEmpty();
	}

}