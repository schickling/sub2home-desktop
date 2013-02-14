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

	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}
}