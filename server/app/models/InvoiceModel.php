<?php namespace App\Models;

use App\Controllers\Services\Document\PDFService;
use File;
use DB;
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


		if ($this->total != $total || $netAmount != $grossAmount / 1.19) {
			throw new Exception('Invoice is calculation doesn\'t match');
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
		$lastMonth = date('n', strtotime('-1 month'));
		$yearOfLastMonth = date('Y', strtotime('-1 month'));

		return $storeModel->ordersCollection()
								->whereRaw('YEAR(created_at) = ' . $yearOfLastMonth)
								->whereRaw('MONTH(created_at) = ' . $lastMonth)
								->get();
	}

}