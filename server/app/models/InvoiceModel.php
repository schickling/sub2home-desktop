<?php namespace App\Models;

use File;
use Exception;
use Queue;

class InvoiceModel extends BaseModel
{

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

	protected function afterFirstSave()
	{
		$this->number = date('y') . date('m') . str_pad($this->id, 4, '0', STR_PAD_LEFT);
		$this->save();
	}

	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}

	public function generateDocument()
	{
		// prevent overwriting an existing document
		$this->checkIfLocked();


		$jobData = array('invoice_model_id' => $this->id);
		Queue::push('App\\Controllers\\Jobs\\Document\\GenerateInvoiceDocumentJob', $jobData);
		
	}

	public function setTotalAttribute($total)
	{
		$this->checkIfLocked();
		$this->attributes['total'] = $total;
	}

	private function checkIfLocked()
	{
		if (!empty($this->documentName)) {
			throw new Exception('Invoice is already locked');
		}
	}

	public function getBelongingOrdersCollectionAttribute()
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