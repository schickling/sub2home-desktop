<?php namespace App\Models;

use Queue;

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

	/**
	 * Confirms the credit
	 * 
	 * @return void
	 */
	public function confirm()
	{
		if ( ! $this->isAccepted) {
			$this->throwException();
		}

		$jobData = array('credit_model_id' => $this->id);

		Queue::push('App\\Controllers\\Jobs\\Order\\ProcessCreditJob', $jobData);

	}

}