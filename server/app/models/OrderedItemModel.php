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

	/**
	 * Returns the menu
	 * 
	 * @return object
	 */
	public function giveMenuModel()
	{
		if ($this->menuUpgradeModel != null) {
			return $this->menuUpgradeModel;
		} elseif ($this->menuBundleModel != null) {
			return $this->menuBundleModel;
		} else {
			return null;
		}
	}

}