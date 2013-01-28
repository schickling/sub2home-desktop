<?php namespace App\Controllers\Api\Backend;

use ClientModel;

/**
* 
*/
class ClientsController extends ApiController
{
	
	public function index()
	{
		$clientsCollection = ClientModel::all();

		return $clientsCollection;
	}

}