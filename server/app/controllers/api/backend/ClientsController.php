<?php namespace App\Controllers\Api\Backend;

use ClientModel;

/**
* 
*/
class ClientsController extends ApiController
{
	
	public function index()
	{
		$clientsCollection = ClientModel::with(array('storesCollection', 'addressModel'))->get();

		foreach ($clientsCollection as $clientModel) {
			foreach ($clientModel->storesCollection as $storeModel) {
				$storeModel->setHidden(array());
			}
		}

		return $clientsCollection->toJson(JSON_NUMERIC_CHECK);
	}

}