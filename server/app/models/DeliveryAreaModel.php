<?php

/**
 * Delivery area class
 *
 * Stores a delivery area
 */
class DeliveryAreaModel extends BaseModel
{
	public $timestamps = false;

	public $hidden = array('store_model_id');

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