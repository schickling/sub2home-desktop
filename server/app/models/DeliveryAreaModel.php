<?php namespace App\Models;

/**
 * Delivery area class
 *
 * Stores a delivery area
 */
class DeliveryAreaModel extends BaseModel
{
	public $timestamps = false;

	protected $table = 'delivery_area_models';

	protected $hidden = array('store_model_id');

	/**
	 * Returns the store
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}

	public function matchesCompoundCity($compoundCity)
	{
		

		$text = 'ignore everything except this (text)';
preg_match('#\((.*?)\)#', $text, $match);
print $match[1];
		
		return true;
	}


}