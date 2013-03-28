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

		$customerAddressModel = $this->orderModel->addressModel;

		// set properties
		$this->senderMail = 'bestellung@sub2home.com';
		$this->senderName = 'sub2home';
		$this->receiverMail = $customerAddressModel->email;
		$this->receiverName = $customerAddressModel->firstName . ' ' . $customerAddressModel->lastName;
		$this->subject = 'sub2home sagt Danke';
		$this->viewName = 'emails.customer.order';
		$this->viewData = $this->getDataForMail();
	}

	private function getDataForMail()
	{
		return array();
	}


}