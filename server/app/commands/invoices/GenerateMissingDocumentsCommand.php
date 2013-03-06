<?php namespace App\Commands\Invoices;

use Illuminate\Console\Command;
use DateTime;

use App\Models\InvoiceModel;
use App\Models\StoreModel;


class GenerateMissingDocumentsCommand extends Command {


	protected $name = 'invoices:generate';

	protected $description = 'Generate missing invoice documents';


	/**
	 * generate for all documentless invoices documents which are at least one month old
	 * 
	 * @return void
	 */
	public function fire()
	{
		$this->checkAllStores();

		$invoicesCollection = InvoiceModel::where('invoiceDocumentName', '')->get();
		$numberOfGeneratedFiles = 0;

		$now = new DateTime();
		$currentTotalNumberOfMonths = getTotalNumberOfMonthsFromDateTime($now);

		foreach ($invoicesCollection as $invoiceModel) {
			if ($invoiceModel->timeSpan < $currentTotalNumberOfMonths) {
				$invoiceModel->generateDocument();
				$numberOfGeneratedFiles++;
			}
		}


		$this->line($numberOfGeneratedFiles . ' invoice documents will be generated.');
	}

	private function checkAllStores()
	{
		$storeCollection = StoreModel::all();

		foreach ($storeCollection as $storeModel) {
			$storeModel->checkInvoices();
		}
	}


}