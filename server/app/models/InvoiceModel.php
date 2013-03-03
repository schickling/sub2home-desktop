<?php namespace App\Models;

use App\Controllers\Services\Document\PDFService;
use File;


class InvoiceModel extends BaseModel
{
	public $timestamps = false;

	protected $table = 'invoice_models';

	protected $hidden = array('store_model_id');

	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}

	public function generateDocument()
	{
		$this->deleteOldDocument();

		$data = array();
		$viewName = 'documents.invoice';

		$documentName = md5(uniqid($this->id, true)) . '.pdf';
		$fileDestination = base_path() . '/public/files/invoices/' . $documentName;

		PDFService::generateDocument($data, $viewName, $fileDestination);

		$this->documentName = $documentName;
		$this->save();
	}

	private function deleteOldDocument()
	{
		if ($this->documentName) {
			
			File::delete($this->documentName);

			$this->documentName = '';
			$this->save();
		}
	}

}