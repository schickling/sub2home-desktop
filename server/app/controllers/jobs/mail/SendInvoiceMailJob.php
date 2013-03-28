<?php namespace App\Controllers\Jobs\Mail;

use App\Models\InvoiceModel;

class SendInvoiceMailJob extends BaseMailJob {

	private $invoiceModel;

	protected function prepareData()
	{
		// fetch invoice model
		$invoice_model_id = $this->data['invoice_model_id'];
		$this->invoiceModel = InvoiceModel::find($invoice_model_id);

		if ($this->invoiceModel == null) {
			$this->throwExecption('Invalid invoice to process');
		}

		$storeModel = $this->invoiceModel->storeModel;
		$storeAddressModel = $storeModel->storeAddressModel;

		// set properties
		$this->senderMail = 'buchhaltung@sub2home.com';
		$this->senderName = 'sub2home';
		$this->receiverMail = $storeAddressModel->email;
		$this->receiverName = $storeModel->title;
		$this->subject = 'Rechnung';
		$this->viewName = 'emails.client.invoice';
		$this->viewData = $this->getDataForMail();
	}

	private function getDataForMail()
	{
		return array();
	}


}