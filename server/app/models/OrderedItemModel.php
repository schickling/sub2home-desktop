<?php

/**
 * Ordered Menu class
 *
 * An orderd menu
 */
class OrderedItemModel extends BaseModel
{

	public $timestamps = false;

	public function delete()
	{
		throw new Exception("Can not delete an ordered item");
	}

	/**
	 * Returns the menu bundle
	 * 
	 * @return object
	 */
	private function menuBundleModel()
	{
		return $this->belongsTo('MenuBundleModel');
	}

	/**
	 * Returns the menu upgrade
	 * 
	 * @return object
	 */
	private function menuUpgradeModel()
	{
		return $this->belongsTo('MenuUpgradeModel');
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
	 * Returns the ordered articles
	 * 
	 * @return object
	 */
	public function orderedArticlesCollection()
	{
		return $this->hasMany('OrderedArticleModel');
	}

	protected function getBaseArticleModelAttribute()
	{
		return $this->orderedArticlesCollection->first()->articleModel;
	}

	/**
	 * Returns the menu
	 * 
	 * @return object
	 */
	public function getMenuModelAttribute()
	{
		// TODO: rewrite
		if ($this->menuUpgradeModel()->get() != null) {
			return $this->menuUpgradeModel()->get();
		} elseif ($this->menuBundleModel()->get() != null) {
			return $this->menuBundleModel()->get();
		} else {
			return null;
		}
	}

	public function calculateTotal($store_model_id)
	{
		$orderedArticlesCollection = $this->orderedArticlesCollection;
		$total = (float) $this->baseArticleModel->returnRealPrice($store_model_id);

		if ($this->menuModel instanceof MenuBundleModel) {
			$total = (float) $this->menuModel->returnRealPrice($store_model_id);
		} elseif ($this->menuModel instanceof MenuUpgradeModel) {
			$total += (float) $this->menuModel->returnRealPrice($store_model_id);
		}

		// sum up ingredients
		foreach ($orderedArticlesCollection as $orderedArticleModel) {
			foreach ($orderedArticleModel->ingredientsCollection as $ingredientModel) {
				$total += (float) $ingredientModel->returnRealPrice($store_model_id);
			}
		}

		$this->total = $total;
	}

}