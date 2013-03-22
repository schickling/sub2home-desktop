<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\BaseJob;
use Exception;
use Mail;

use App\Models\InvoiceModel;

class SendInvoiceMailJob extends BaseJob {

	private $invoiceModel;

	protected function run()
	{
		$invoice_model_id = $this->data['invoice_model_id'];
		$this->invoiceModel = InvoiceModel::find($invoice_model_id);

		if ($this->invoiceModel == null) {
			throw new Exception('Invalid invoice to process');
		}

		$this->sendMail();

	}

	private function sendMail()
	{
		$storeModel = $this->invoiceModel->storeModel;
		$addressModel = $storeModel->addressModel;
		$emailAddress = $addressModel->email;
		$name = $addressModel->title;

		$data = array();

		Mail::send('emails.client.invoice', $data, function($mail) use ($emailAddress, $name)
		{
			$mail->from('buchhaltung@sub2home.com', 'sub2home');
			$mail->to($emailAddress, $name);
			$mail->subject('Rechnung');
		});
	}


}