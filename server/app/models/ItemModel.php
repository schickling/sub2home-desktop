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
	final protected function check()
	{
		if (!$this->isPublished) {
			$this->throwException('Item not published');
		}
	}

	final public function isActive($store_model_id)
	{
		return $this->returnCustomModel($store_model_id)->isActive;
	}

	/**
	 * Returns the custom price of the item
	 *
	 * @param int $store_model_id
	 * @return float
	 */
	final public function returnCustomPrice($store_model_id)
	{
		$this->check();

		return $this->returnCustomModel($store_model_id)->price;
	}

	final public function increaseBuyedCounter($increase)
	{
		if ($increase < 1) {
			$this->throwException('Invalid increment for buyed value');
		}

		$this->attributes['buyed'] += $increase;
	}


}
