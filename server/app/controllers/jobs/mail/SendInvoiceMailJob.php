<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\BaseJob;

use App\Models\InvoiceModel;
use Exception;

class SendInvoiceMailJob extends BaseJob {

	protected function run()
	{
		$invoice_model_id = $this->data['invoice_model_id'];
		$invoiceModel = InvoiceModel::find($invoice_model_id);

		if ($invoiceModel == null) {
			throw new Exception('Invalid invoice to process');
		}

	}


}