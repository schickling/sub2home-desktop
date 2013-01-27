<?php

/**
 * Ordered Menu class
 *
 * An orderd menu
 */
class OrderedMenuModel extends BaseModel
{
	public function delete()
	{
		throw new Exception("Can not delete an ordered menu");
	}

	public function save()
	{
		$ret = parent::save();

		$this->calculateTotal();

		return $ret;
	}

	/**
	 * Returns the menu bundle
	 * 
	 * @return object
	 */
	public function menuBundleModel()
	{
		return $this->belongsTo('MenuBundleModel');
	}

	/**
	 * Returns the menu upgrade
	 * 
	 * @return object
	 */
	public function menuUpgradeModel()
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

	/**
	 * Returns the menu
	 * 
	 * @return object
	 */
	public function getMenuModel()
	{
		if ($this->menuUpgradeModel != null) {
			return $this->menuUpgradeModel;
		} elseif ($this->menuBundleModel != null) {
			return $this->menuBundleModel;
		} else {
			throw new Exception("Ordered menu has no parent menu");
		}
	}

	/**
	 * Sets the total
	 *
	 * @return void
	 */
	private function calculateTotal()
	{
		
		$this->total = 1;
	}

}