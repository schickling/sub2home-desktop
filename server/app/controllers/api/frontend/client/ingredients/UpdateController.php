<?php namespace App\Controllers\Api\Frontend\Client\Ingredients;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use Input;
use Request;
use App\Models\IngredientModel;

/**
* 
*/
class UpdateController extends StoreRelatedApiController
{

	/**
	 * @PUT('api/frontend/stores/{alias}/ingredients/{id}')
	 */
	public function route()
	{
		// check input
		$input = Input::all();
		$rules = array(
			'customPrice'	=> 'numeric|required|min:0',
			'isActive'		=> 'boolean|required'
			);

		$this->validateInput($rules);

		// fetch customIngredientModel
		$id = Request::segment(6);
		$ingredientModel = IngredientModel::find($id);

		// check if found
    	$this->checkModelFound($ingredientModel);

		$customIngredientModel = $ingredientModel->returnCustomModel($this->storeModel->id);

		// update
		$customIngredientModel->isActive = $input['isActive'];
		$customIngredientModel->price = $input['customPrice'];
		$customIngredientModel->save();

		return $this->respond(204);
	}

}