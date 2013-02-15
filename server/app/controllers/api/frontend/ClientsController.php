<?php namespace App\Controllers\Api\Frontend;

use App\Models\ClientModel;


class ClientsController extends ApiController
{

	public function show()
	{
		// authentication is implied by fetching client model id
		$client_model_id = $this->getClientModelIdFromToken();

		$clientModel = ClientModel::with(array('storesCollection', 'addressModel'))
									->find($client_model_id);



		
		return $clientModel->toJson(JSON_NUMERIC_CHECK);
	}


}