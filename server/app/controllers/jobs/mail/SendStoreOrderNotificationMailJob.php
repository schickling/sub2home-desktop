<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\BaseJob;
use Exception;
use Mail;

use Log;

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
		$storeModel = $this->orderModel->storeModel;
		$emailAddress = $storeModel->orderEmail;
		$addressModel = $storeModel->addressModel;
		$name = $addressModel->firstName . ' ' . $addressModel->lastName;
		$subject = sprintf('Neue Bestellung #%s', $this->orderModel->id);

		$data = $this->getDataForMail();

		Mail::send('emails.client.order', $data, function($mail) use ($emailAddress, $name, $subject)
		{
			$mail->from('bestellung@sub2home.com', 'sub2home');
			$mail->to($emailAddress, $name);
			$mail->subject($subject);
		});

		Log::info($emailAddress);
		Log::info($name);

		Log::info($subject);
	}

	private function getDataForMail()
	{
		$orderModel = $this->orderModel;
		$addressModelOfCustomer = $orderModel->addressModel;

		$data = array(
			'addressFirstName'	=> $addressModelOfCustomer->firstName,
			'addressLastName'	=> $addressModelOfCustomer->lastName,
			'addressStreet'		=> $addressModelOfCustomer->street,
			'addressPostal'		=> $addressModelOfCustomer->postal,
			'addressCity'		=> $addressModelOfCustomer->city,
			'orderNumber'		=> str_pad($orderModel->id, 8, '0', STR_PAD_LEFT)
			);

		return $data;
	}


}