<?php namespace App\Models;


class InvoiceModel extends BaseModel
{
	public $timestamps = false;

	protected $table = 'invoice_models';

	protected $hidden = array('store_model_id');

	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}

}