<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\JobInterface;

use App\Models\InvoiceModel;
use Exception;

class InvoiceMailJob implements JobInterface {

	public function fire($job, $data)
	{
		$invoice_model_id = $data['invoice_model_id'];
		$invoiceModel = InvoiceModel::find($invoice_model_id);

		if ($invoiceModel == null) {
			throw new Exception('Invalid invoice to process');
		}

		$job->delete();
	}


}