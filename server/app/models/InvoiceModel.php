<?php namespace App\Models;

use App\Controllers\Services\Document\PDFService;
use File;


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

		// calculate amounts
		$this->calculate();

		$data = array();
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

	public function setNumberOfOrdersAttribute($numberOfOrders)
	{
		$this->checkIfLocked();
		$this->attributes['numberOfOrders'] = $numberOfOrders;
	}

	public function setNetAmountAttribute($netAmount)
	{
		$this->checkIfLocked();
		$this->attributes['netAmount'] = $netAmount;
	}

	public function setGrossAmountAttribute($grossAmount)
	{
		$this->checkIfLocked();
		$this->attributes['grossAmount'] = $grossAmount;
	}

	private function calculate()
	{
		$total = 0;
		$netAmount = 0;
		$grossAmount = 0;
		$ordersCollection = $this->getBelongingOrdersCollection();
		$numberOfOrders = $ordersCollection->count();

		foreach ($ordersCollection as $orderModel) {
			$orderTotal = $orderModel->total;
			$orderGrossAmount = $orderTotal * $orderModel->commissionRate;
			$orderNetAmount = $orderGrossAmount * 0.81; // 0.81 = 1 - 0.19

			$total += $orderTotal;
			$grossAmount += $orderGrossAmount;
			$netAmount += $orderNetAmount;
		}


		if ($this->total != $total || $this->numberOfOrders != $numberOfOrders || $netAmount != $grossAmount * 0.81) {
			throw new Exception('Invoice is calculation doesn\'t match');
		}

		$this->netAmount = $netAmount;
		$this->grossAmount = $grossAmount;
		$this->save();
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

		return $storeModel->ordersCollection()->where(DB::raw('YEAR(month)', '=', $yearOfLastMonth))
										->where(DB::raw('MONTH(month)', '=', $lastMonth))
										->get();
	}

}