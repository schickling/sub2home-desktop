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

		// get() because collection got refreshed perhaps
		$invoicesCollection = $this->storeModel->invoicesCollection()->get();

		
		return $invoicesCollection->toJson(JSON_NUMERIC_CHECK);
	}


}