<?php namespace App\Models;


class MonthlyReportModel extends BaseModel
{
	public $timestamps = false;

	protected $table = 'monthly_report_models';

	protected $hidden = array('store_model_id');

	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}
}