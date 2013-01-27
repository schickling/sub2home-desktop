<?php

/**
 * Ordered Article class
 *
 * An orderd article
 */
class OrderedArticleModel extends BaseModel
{

	public function delete()
	{
		throw new Exception("Can not delete an ordered article");
	}

	public function save()
	{
		$ret = parent::save();

		$this->calculateTotal();

		return $ret;
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
	public function orderModel()
	{
		return $this->belongsTo('OrderModel');
	}

	/**
	 * Returns the ingredients of the ordered article
	 * 
	 * @return array
	 */
	public function ingredientsCollection()
	{
		return $this->hasMany('IngredientModel');
	}

	/**
	 * Returns the ordered menu if the article is part of one
	 * 
	 * @return object
	 */
	public function orderedMenu()
	{
		return $this->belongsTo('OrderedMenuModel');
	}

	/**
	 * Sets the total
	 *
	 * @return void
	 */
	private function calculateTotal()
	{
		$this->articleModel->check();

		$total = 1;

		$this->total = $total;
	}

}