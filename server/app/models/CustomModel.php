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

	final public function increaseBuyedCounter($increase)
	{
		if ($increase < 1) {
			$this->throwException('Invalid increment for buyed value');
		}

		$this->attributes['buyed'] += $increase;
	}

}