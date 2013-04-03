<?php namespace App\Controllers\Jobs\Order;

use App\Controllers\Jobs\BaseJob;
use App\Models\CreditModel;

class ProcessCreditJob extends BaseJob {

	private $creditModel;

	protected function run()
	{
		$credit_model_id = $this->data['credit_model_id'];
		$this->creditModel = CreditModel::find($credit_model_id);

		if ($this->creditModel == null) {
			$this->throwExecption('Invalid credit to process');
		}

		$this->updateInvoiceOfMatchingMonth();

	}

	private function updateInvoiceOfMatchingMonth()
	{
		$creditModel = $this->creditModel;
		$orderModel = $creditModel->orderModel;
		$invoiceModel = $orderModel->invoiceModel;
		
		$invoiceModel->total -= $creditModel->total;
		$invoiceModel->save();
	}

}