<?php namespace App\Controllers\Jobs\Mail;

use App\Models\OrderModel;

class SendCustomerOrderConfirmMailJob extends BaseMailJob {

	private $orderModel;

	protected function prepareData()
	{
		// fetch order model
		$order_model_id = $this->data['order_model_id'];
		$this->orderModel = OrderModel::find($order_model_id);

		if ($this->orderModel == null) {
			$this->throwExecption('Invalid order to process');
		}

		$addressModelOfCustomer = $this->orderModel->addressModel;

		// set properties
		$this->senderMail = 'bestellung@sub2home.com';
		$this->senderName = 'sub2home';
		$this->receiverMail = $addressModelOfCustomer->email;
		$this->receiverName = $addressModelOfCustomer->firstName . ' ' . $addressModelOfCustomer->lastName;
		$this->subject = 'sub2home sagt Danke';
		$this->viewName = 'emails.customer.order';
		$this->viewData = $this->getDataForMail();
	}

	private function getDataForMail()
	{
		$orderModel = $this->orderModel;
		$storeModel = $orderModel->storeModel;
		$addressModelOfCustomer = $orderModel->addressModel;
		$addressModelOfStore = $storeModel->addressModel;

		$data = array(
			'customerFirstName'	=> $addressModelOfCustomer->firstName,
			'storeStreet'		=> $addressModelOfStore->street,
			'storePostal'		=> $addressModelOfStore->postal,
			'storeCity'			=> $addressModelOfStore->city,
			'storePhone'		=> $addressModelOfStore->city,
			'storeNumber'		=> $addressModelOfStore->phone,
			'storeTitle'		=> $storeModel->title,
			'dueTime'			=> $orderModel->getDateTimeFor('due_at')->format('H:m')
			);

		return $data;
	}


}