<?php namespace App\Models;

/**
 * Credit class
 */
class CreditModel extends BaseModel
{
	protected $hidden = array('order_model_id', 'created_at', 'updated_at');

	protected $fillable = array('description', 'total', 'isAccepted');

	protected $table = 'credit_models';

	public function orderModel()
	{
		return $this->belongsTo('App\\Models\\OrderModel');
	}

}