<?php namespace App\Commands\Invoices;

use Illuminate\Console\Command;
use DateTime;
use Queue;

use App\Models\StoreModel;



class SendInvoiceMailsForLastMonthCommand extends Command {


	protected $name = 'invoices:send';

	protected $description = 'Send invoices of the last month to all clients';

	/**
	 * Execute the console command.
	 *
	 * @return void
	 */
	public function fire()
	{
		$this->call('invoices:generate');


		$storesCollection = StoreModel::where('isActive', true)->get();
		$lastMonth = date('n', strtotime('-1 month'));
		$numberOfSendedInvoices = 0;

		foreach ($storesCollection as $storeModel) {
			$invoicesCollection = $storeModel->invoicesCollection()->orderBy('id', 'desc')->get();

			foreach ($invoicesCollection as $invoiceModel) {
				$invoiceDateTime = makeDateTimeFromTotalNumberOfMonths($invoiceModel->timeSpan);
				$invoiceMonth = $invoiceDateTime->format('n');

				if ($invoiceMonth == $lastMonth) {
					$this->sendInvoiceToOwner($invoiceModel);
					break;
				}
			}
		}


		$this->line($numberOfSendedInvoices . ' invoice mails will be sent.');
	}

	private function sendInvoiceToOwner($invoiceModel)
	{
		$jobData = array('invoice_model_id' => $invoiceModel->id);
		
		Queue::push('App\\Controllers\\Jobs\\Mail\\SendInvoiceMailJob', $jobData);	
	}
}