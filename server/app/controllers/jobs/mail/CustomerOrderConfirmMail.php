<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\JobInterface;

use App\Models\OrderModel;
use Exception;

class CustomerOrderConfirmMail implements JobInterface {

	private $orderModel;

	public function fire($job, $data)
	{
		$order_model_id = $data['order_model_id'];
		$this->orderModel = OrderModel::find($order_model_id);

		if ($this->orderModel == null) {
			throw new Exception('Invalid order to process');
		}

		$job->delete();
	}


}