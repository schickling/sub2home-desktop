<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\BaseJob;
use Exception;
use Mail;

use App\Models\OrderModel;

class SendStoreOrderNotificationMailJob extends BaseJob {

	private $orderModel;

	protected function run()
	{
		$order_model_id = $this->data['order_model_id'];
		$this->orderModel = OrderModel::find($order_model_id);

		if ($this->orderModel == null) {
			throw new Exception('Invalid order to process');
		}

		$this->sendMail();
		
	}

	private function sendMail()
	{
		$addressModel = $this->orderModel->addressModel;
		$emailAddress = $addressModel->email;
		$name = $addressModel->firstName . ' ' . $addressModel->lastName;

		$data = array();

		Mail::send('emails.customer.order', $data, function($mail) use ($emailAddress, $name)
		{
			$mail->from('danke@sub2home.de', 'sub2home');
			$mail->to($emailAddress, $name);
			$mail->subject('Danke fuer deine Bestellungen');
		});
	}


}