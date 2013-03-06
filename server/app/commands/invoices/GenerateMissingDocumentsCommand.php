<?php namespace App\Commands\Invoices;

use Illuminate\Console\Command;
use DateTime;

use App\Models\InvoiceModel;
use App\Models\StoreModel;


class GenerateMissingDocumentsCommand extends Command {


	protected $name = 'invoices:generate';

	protected $description = 'Generate missing invoice documents';


	public function fire()
	{
		$this->checkAllStores();


		// generate for all documentless invoices documents which are at least one month old
		$invoicesCollection = InvoiceModel::where('invoiceDocumentName', '')->get();
		$numberOfGeneratedFiles = 0;

		$now = new DateTime();
		$currentTotalNumberOfMonths = $this->getTotalNumberOfMonths($now);

		foreach ($invoicesCollection as $invoiceModel) {
			$invoiceDateTime = new DateTime($invoiceModel->timeSpan);
			$invoiceTotalNumberOfMonths = $this->getTotalNumberOfMonths($invoiceDateTime);


			if ($invoiceTotalNumberOfMonths < $currentTotalNumberOfMonths) {
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

	private function getTotalNumberOfMonths($dateTime)
	{
		return (int) $dateTime->format('n') + (int) $dateTime->format('Y') * 12;
	}


}