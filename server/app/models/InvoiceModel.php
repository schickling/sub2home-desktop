<?php namespace App\Models;

use App\Controllers\Services\Document\PDFService;
use File;
use Exception;

class InvoiceModel extends BaseModel
{
	public $timestamps = false;

	protected $table = 'invoice_models';

	protected $hidden = array('store_model_id');


	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		$document = base_path() . '/public/files/invoices/' . $this->documentName;
		File::delete($document);
		
		return parent::delete();
	}

	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}

	public function generateDocument()
	{
		// prevent overwriting an existing document
		$this->checkIfLocked();

		// calculate data
		$data = $this->calculateData();
		
		// TODO complete data


		// add svg images
		$imageFolder = base_path() . '/app/views/img/';
		$svgTitle = $imageFolder . 'invoiceTitle.svg';
		$svgLogo = $imageFolder . 'subwayLogo.svg';
		$data['svg'] = array(
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


		$viewName = 'documents.invoice';

		$documentName = md5(uniqid($this->id, true)) . '.pdf';
		$fileDestination = base_path() . '/public/files/invoices/' . $documentName;

		PDFService::generateDocument($data, $viewName, $fileDestination);

		$this->documentName = $documentName;
		$this->save();
	}

	public function setTotalAttribute($total)
	{
		$this->checkIfLocked();
		$this->attributes['total'] = $total;
	}

	private function calculateData()
	{
		$total = 0;
		$netAmount = 0;
		$grossAmount = 0;
		$ordersCollection = $this->getBelongingOrdersCollection();
		$numberOfOrders = $ordersCollection->count();

		foreach ($ordersCollection as $orderModel) {
			$orderTotal = $orderModel->total;
			$orderGrossAmount = $orderTotal * $orderModel->commissionRate;
			$orderNetAmount = $orderGrossAmount / 1.19;

			$total += $orderTotal;
			$grossAmount += $orderGrossAmount;
			$netAmount += $orderNetAmount;
		}


		if (abs($this->total - $total) > 0.00001) {
			$message = sprintf('Invoice calculation: totals doesn\'t match (%f, %f)', $this->total, $total);
			throw new Exception($message);
		}

		if (abs($netAmount - $grossAmount / 1.19) > 0.00001) {
			$message = sprintf('Invoice calculation: net amounts doesn\'t match (%f, %f)', $netAmount, $grossAmount / 1.19);
			throw new Exception($message);
		}

		return array(
			'grossAmount'		=> $grossAmount,
			'netAmount'			=> $netAmount,
			'numberOfOrders'	=> $numberOfOrders
			);
	}

	private function checkIfLocked()
	{
		if (!empty($this->documentName)) {
			throw new Exception('Invoice is already locked');
		}
	}

	private function getBelongingOrdersCollection()
	{
		$storeModel = $this->storeModel;
		$lastMonth = date('n', strtotime($this->timeSpan));
		$yearOfLastMonth = date('Y', strtotime($this->timeSpan));

		return $storeModel->ordersCollection()
								->whereRaw('YEAR(created_at) = ' . $yearOfLastMonth)
								->whereRaw('MONTH(created_at) = ' . $lastMonth)
								->get();
	}

}