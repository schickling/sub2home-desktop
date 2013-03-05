<?php namespace App\Controllers\Jobs\Document;

use App\Controllers\Jobs\BaseJob;
use App\Controllers\Services\Document\PDFService;
use Exception;
use DateTime;

use App\Models\InvoiceModel;



class GenerateInvoiceDocumentJob extends BaseJob {

	private $invoiceModel;

	private $invoiceData = array();


	protected function run()
	{
		$invoice_model_id = $this->data['invoice_model_id'];
		$this->invoiceModel = InvoiceModel::find($invoice_model_id);

		if ($this->invoiceModel == null) {
			throw new Exception('Invalid invoice to process');
		}
		



		$this->addAmountsToData();
		$this->addSVGToData();
		$this->addBankaccountToData();
		$this->addAddressToData();
		$this->addInfoToData();



		$documentName = md5(uniqid($this->invoiceModel->id, true)) . '.pdf';
		$fileDestination = base_path() . '/public/files/invoices/' . $documentName;

		PDFService::generateDocument($this->invoiceData, 'documents.invoice', $fileDestination);

		$this->saveDocumentName($documentName);

	}

	private function addAmountsToData()
	{
		$total = 0;
		$netAmount = 0;
		$grossAmount = 0;
		$ordersCollection = $this->invoiceModel->belongingOrdersCollection;
		$numberOfOrders = $ordersCollection->count();

		foreach ($ordersCollection as $orderModel) {
			$orderTotal = $orderModel->total;
			$orderGrossAmount = $orderTotal * $orderModel->commissionRate;
			$orderNetAmount = $orderGrossAmount / 1.19;

			$total += $orderTotal;
			$grossAmount += $orderGrossAmount;
			$netAmount += $orderNetAmount;
		}


		if (abs($this->invoiceModel->total - $total) > 0.00001) {
			$message = sprintf('Invoice calculation: totals doesn\'t match (%f, %f)', $this->invoiceModel->total, $total);
			throw new Exception($message);
		}

		if (abs($netAmount - $grossAmount / 1.19) > 0.00001) {
			$message = sprintf('Invoice calculation: net amounts doesn\'t match (%f, %f)', $netAmount, $grossAmount / 1.19);
			throw new Exception($message);
		}


		$this->invoiceData['grossAmount'] = number_format($grossAmount, 2, ',', '.');
		$this->invoiceData['netAmount'] = number_format($netAmount, 2, ',', '.');
		// $this->invoiceData['numberOfOrders'] = $numberOfOrders;
		$this->invoiceData['total'] = number_format($total, 2, ',', '.');
		$this->invoiceData['tax'] = number_format($grossAmount - $netAmount, 2, ',', '.');
	}


	private function addSVGToData()
	{
		// add svg images
		$imageFolder = base_path() . '/app/views/img/';
		$svgTitle = $imageFolder . 'invoiceTitle.svg';
		$svgLogo = $imageFolder . 'subwayLogo.svg';
		$this->invoiceData['svg'] = array(
			array(
				'x'		=> 19,
				'y'		=> 97,
				'file'	=> $svgTitle
				),
			array(
				'x'		=> 169,
				'y'		=> 12,
				'file'	=> $svgLogo
				)
			);
	}

	private function addBankaccountToData($value='')
	{
		$storeModel = $this->invoiceModel->storeModel;
		$clientModel = $storeModel->clientModel;
		$bankaccountModel = $clientModel->bankaccountModel;

		$this->invoiceData['bankaccountAccountNumber'] = $bankaccountModel->accountNumber;
		$this->invoiceData['bankaccountBankCodeNumber'] = $bankaccountModel->bankCodeNumber;
		$this->invoiceData['bankaccountBankName'] = $bankaccountModel->bankName;

	}

	private function addInfoToData()
	{
		$storeModel = $this->invoiceModel->storeModel;
		$clientModel = $storeModel->clientModel;
		$invoiceTimeSpanDateTime = new DateTime($this->invoiceModel->timeSpan);
		$invoiceUpdatedAtDateTime = new DateTime($this->invoiceModel->updated_at);

		$this->invoiceData['infoStoreTitle'] = $storeModel->title;
		$this->invoiceData['infoStoreNumber'] = $storeModel->number;
		$this->invoiceData['infoClientNumber'] = $clientModel->number;
		$this->invoiceData['infoTimeSpan'] = $invoiceTimeSpanDateTime->format('M Y');
		$this->invoiceData['infoInvoiceDate'] = $invoiceUpdatedAtDateTime->format('d.m.y');
		$this->invoiceData['infoInvoiceNumber'] = $this->invoiceModel->number;
	}

	private function addAddressToData()
	{
		$storeModel = $this->invoiceModel->storeModel;
		$clientModel = $storeModel->clientModel;
		$addressModel = $clientModel->addressModel;

		$this->invoiceData['addressFirstName'] = $addressModel->firstName;
		$this->invoiceData['addressLastName'] = $addressModel->lastName;
		$this->invoiceData['addressStreet'] = $addressModel->street;
		$this->invoiceData['addressPostal'] = $addressModel->postal;
		$this->invoiceData['addressCity'] = $addressModel->city;
	}

	private function saveDocumentName($documentName)
	{
		$this->invoiceModel->documentName = $documentName;
		$this->invoiceModel->save();
	}


}