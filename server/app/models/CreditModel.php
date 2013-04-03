<?php namespace App\Models;

/**
 * Credit class
 */
class CreditModel extends BaseModel
{
	protected $hidden = array('ownerModel_id', 'ownerModel_type');

	protected $fillable = array('firstName', 'lastName', 'street', 'streetAdditional', 'postal', 'city', 'email', 'phone');
	

	public function orderModel()
	{
		return $this->belongsTo('App\\Models\\OrderModel');
	}

}