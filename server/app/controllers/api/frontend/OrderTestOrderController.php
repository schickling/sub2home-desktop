<?php namespace App\Controllers\Api\Frontend;

use App\Models\TestOrderModel;

/**
* 
*/
class OrderTestOrderController extends ApiController
{

	public function create()
	{
		// prepare
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		TestOrderModel::generateTestOrderForStore($this->storeModel->id, true);

		return $this->respondWithStatus(204);
	}


}