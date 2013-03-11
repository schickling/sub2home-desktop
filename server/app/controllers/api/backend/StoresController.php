<?php namespace App\Controllers\Api\Backend;

use Input;

use App\Models\StoreModel;

/**
* 
*/
class StoresController extends ApiController
{
	
	public function create()
	{
		// $this->loadStoreModel();

		// $storeModel = new StoreModel(array(
		// 	'store_model_id' => $this->storeModel->id,
		// 	'minimumValue' => 0.00,
		// 	'minimumDuration' => 0,
		// 	'description' => '',
		// 	'postal' => $this->storeModel->addressModel->postal
		// 	));

		// $storeModel->save();

		// return $storeModel->toJson(JSON_NUMERIC_CHECK);
	}

	public function update($id)
	{
		$input = Input::json();

		$storeModel = StoreModel::find($id);

		if ($storeModel == null) {
			$this->error(404);
		}

		$storeModel->isActive = $input['isActive'];
		$storeModel->isOpen = $input['isOpen'];
		$storeModel->number = $input['number'];
		$storeModel->title = $input['title'];

		$storeModel->save();

		return $storeModel;
	}

	public function destroy()
	{
		// $id = Request::segment(6);

		// $storeModel = StoreModel::find($id);

		// $storeModel->delete();
	}	

}