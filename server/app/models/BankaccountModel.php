<?php namespace App\Models;

/**
 * bank account class
 *
 * Stores all bank account data
 */
class BankaccountModel extends BaseModel
{
	public $timestamps = false;

	protected $table = 'bankaccount_models';

	protected $hidden = array('client_model_id');

	public function clientModel()
	{
		return $this->belongsTo('App\\Models\\ClientModel');
	}
}