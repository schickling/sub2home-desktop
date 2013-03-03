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

		// recalculate
		$this->recalculate();

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

	private function recalculate()
	{
		$storeModel = $this->storeModel;

		// TODO
	}

	private function checkIfLocked()
	{
		if (!empty($this->documentName)) {
			throw new Exception('Invoice is already locked');
		}
	}

}