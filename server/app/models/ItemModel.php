<?php namespace App\Models;

/**
* Item
 */
abstract class ItemModel extends BaseModel
{


	/**
	 * Returns the custom article respecting a specific store
	 * 
	 * @param  int $store_model_id
	 * @return object
	 */
	abstract public function returnCustomModel($store_model_id);

	/**
	 * Returns whether the article and the custom article is published
	 *
	 * @return void
	 */
	public function check()
	{
		if (!$this->isPublished) {
			throw new Exception("Item not published");
		}
	}

	/**
	 * Returns the price of the item (respects custom items)
	 *
	 * @param int $store_model_id
	 * @return float
	 */
	public function returnRealPrice($store_model_id)
	{
		$this->check();
		
		$customItemModel = $this->returnCustomModel($store_model_id);

		if ($customItemModel->hasOwnPrice) {
			return $customItemModel->price;
		} else {
			return $this->price;
		}
	}

	public function isActive($store_model_id)
	{
		return $this->returnCustomModel($store_model_id)->isActive;
	}

	/**
	 * Returns the custom price of the item
	 *
	 * @param int $store_model_id
	 * @return float
	 */
	public function returnCustomPrice($store_model_id)
	{
		$this->check();

		return $this->returnCustomModel($store_model_id)->price;
	}

}
