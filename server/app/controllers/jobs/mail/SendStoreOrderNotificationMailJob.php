<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\BaseJob;

use App\Models\OrderModel;
use Exception;

class SendStoreOrderNotificationMailJob extends BaseJob {

	protected function run()
	{
		$order_model_id = $this->data['order_model_id'];
		$orderModel = OrderModel::find($order_model_id);

		if ($orderModel == null) {
			throw new Exception('Invalid order to process');
		}
	}


}