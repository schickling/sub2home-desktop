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
		$subject = sprintf('Neue Bestellung #%s', str_pad($this->orderModel->id, 8, '0', STR_PAD_LEFT));

		$data = $this->getDataForMail();

		Mail::send('emails.client.order.order', $data, function($mail) use ($emailAddress, $name, $subject)
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
		$storeModel = $this->orderModel->storeModel;
		$addressModelOfCustomer = $orderModel->addressModel;
		$addressModelOfStore = $storeModel->addressModel;

		$data = array(
			'customerFirstName'			=> $addressModelOfCustomer->firstName,
			'customerLastName'			=> $addressModelOfCustomer->lastName,
			'customerStreet'			=> $addressModelOfCustomer->street,
			'customerPostal'			=> $addressModelOfCustomer->postal,
			'customerCity'				=> $addressModelOfCustomer->city,
			'storeStreet'				=> $addressModelOfStore->street,
			'storePostal'				=> $addressModelOfStore->postal,
			'storeCity'					=> $addressModelOfStore->city,
			'orderNumber'				=> str_pad($orderModel->id, 8, '0', STR_PAD_LEFT),
			'orderedItemsCollection'	=> $orderModel->orderedItemsCollection
			);

		return $data;
	}


}