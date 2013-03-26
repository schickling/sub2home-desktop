<?php namespace App\Models;


abstract class CustomModel extends BaseModel
{

	protected $fillable = array('store_model_id', 'price', 'isActive');

	/**
	 * Returns the store
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}

}