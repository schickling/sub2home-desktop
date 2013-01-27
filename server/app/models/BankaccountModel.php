<?php

/**
 * bank account class
 *
 * Stores all bank account data
 */
class BankaccountModel extends BaseModel
{
	public $timestamps = false;

	public function storeModel()
	{
		return $this->belongsTo('StoreModel');
	}
}