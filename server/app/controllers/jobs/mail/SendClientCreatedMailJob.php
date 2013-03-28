<?php namespace App\Controllers\Jobs\Mail;

use App\Models\ClientModel;

class SendClientCreatedMailJob extends BaseMailJob {

	private $clientModel;

	protected function prepareData()
	{
		// fetch invoice model
		$client_model_id = $this->data['client_model_id'];
		$this->clientModel = ClientModel::find($client_model_id);

		if ($this->clientModel == null) {
			$this->throwExecption('No such client found');
		}

		$clientAddressModel = $this->clientModel->addressModel;

		// set properties
		$this->senderMail = 'hallo@sub2home.com';
		$this->senderName = 'sub2home';
		$this->receiverMail = $clientAddressModel->email;
		$this->receiverName = $clientAddressModel->firstName . ' ' . $clientAddressModel->lastName;
		$this->subject = 'Herzlich Willkommen';
		$this->viewName = 'emails.client.created';
		$this->viewData = $this->getDataForMail();
	}

	private function getDataForMail()
	{
		return array();
	}


}