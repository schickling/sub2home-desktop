<?php namespace App\Controllers\Api\Frontend\Client\Clients;

use App\Controllers\Api\Frontend\Client\ApiController;
use Input;
use Hash;

use App\Models\ClientModel;


class ShowController extends ApiController
{

	/**
	 * @GET('api/frontend/clients')
	 */
	public function route()
	{
		$clientModelId = $this->getClientModelIdFromToken();

		$clientModel = ClientModel::with(array(
										'storesCollection',
										'storesCollection.invoicesCollection',
										'addressModel',
										'bankaccountModel'
									))
									->find($clientModelId);


		$this->checkModelFound($clientModel);

		foreach ($clientModel->storesCollection as $storeModel) {
			$storeModel->numberOfUndoneOrders = $storeModel->ordersCollection()
															->where('isDelivered', false)
															->count();
		}
		
		return $clientModel->toJson(JSON_NUMERIC_CHECK);
	}


	protected function getClientModelIdFromResourceModel()
	{
		// authentication is implied by fetching client model id
		return $this->getClientModelIdFromToken();
	}


}