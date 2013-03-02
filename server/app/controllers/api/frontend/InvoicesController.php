<?php namespace App\Controllers\Api\Frontend;



class InvoicesController extends ApiController
{

	public function index()
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}


		$this->storeModel->checkInvoices();
		$invoicesCollection = $this->storeModel->invoicesCollection;

		
		return $invoicesCollection->toJson(JSON_NUMERIC_CHECK);
	}


}