<?php namespace App\Models;

use File;
use App\Exceptions\ModelException;
use Queue;
use DateTime;

class InvoiceModel extends BaseModel
{

	protected $table = 'invoice_models';

	protected $hidden = array('store_model_id', 'created_at', 'updated_at');


	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		$document = base_path() . '/public/files/invoices/' . $this->invoiceDocumentName;
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

	public function ordersCollection()
	{
		return $this->hasMany('App\\Models\\OrderModel');
	}

	public function generateDocument()
	{
		// prevent overwriting an existing document
		$this->checkIfLocked();

		$jobData = array('invoice_model_id' => $this->id);
		Queue::push('App\\Controllers\\Jobs\\Document\\GenerateInvoiceDocumentJob', $jobData);
		
	}

	public function setTimeSpanAttribute($timeSpan)
	{
		$currentTotalNumberOfMonths = getTotalNumberOfMonthsFromDateTime(new DateTime());
		if ($timeSpan > $currentTotalNumberOfMonths) {
			throw new ModelException('Invoice can\'t be in the future');
		}

		$this->attributes['timeSpan'] = $timeSpan;
	}

	public function setTotalAttribute($total)
	{
		$this->checkIfLocked();
		$this->attributes['total'] = $total;
	}

	private function checkIfLocked()
	{
		if (!empty($this->invoiceDocumentName) or !empty($this->attachmentDocumentName)) {
			throw new ModelException('Invoice is already locked');
		}
	}

}