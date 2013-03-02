<?php namespace App\Controllers\Api\Frontend;

use Input;
use Hash;
use Validator;

use App\Models\ClientModel;


class MonthlyReportsController extends ApiController
{

	public function index()
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}


		$monthlyReportsCollection = $this->storeModel->monthlyReportsCollection;

		
		return $monthlyReportsCollection->toJson(JSON_NUMERIC_CHECK);
	}


}