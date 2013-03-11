<?php namespace App\Controllers\Api\Backend;

use App\Models\ClientModel;

/**
* 
*/
class ClientsController extends ApiController
{
	
	public function index()
	{
		$clientsCollection = ClientModel::with(array(
			'storesCollection',
			'storesCollection.addressModel',
			'addressModel'
			))->get();

		foreach ($clientsCollection as $clientModel) {
			$clientModel->setHidden(array());
			foreach ($clientModel->storesCollection as $storeModel) {
				$storeModel->setHidden(array());
			}
		}

		return $clientsCollection->toJson(JSON_NUMERIC_CHECK);
	}

	public function update()
	{
		// $input = Input::json();

		// $storeModel = StoreModel::find($id);

		// if ($storeModel == null) {
		// 	$this->error(404);
		// }

		// $storeModel->isActive = $input['isActive'];
		// $storeModel->isOpen = $input['isOpen'];
		// $storeModel->number = $input['number'];
		// $storeModel->title = $input['title'];

		// $storeModel->save();

		// return $storeModel;
	}

}