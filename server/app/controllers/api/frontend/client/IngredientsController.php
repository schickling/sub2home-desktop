<?php namespace App\Controllers\Api\Frontend\Client;

use Input;
use Validator;

use App\Models\IngredientModel;

/**
* 
*/
class IngredientsController extends ApiController
{

	
	public function update($id)
	{
		// security
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// check input
		$input = Input::json();
		$rules = array(
			'customPrice' => 'numeric|required|min:0'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// fetch customIngredientModel
		$ingredientModel = IngredientModel::find($id);
		$customIngredientModel = $ingredientModel->returnCustomModel($this->storeModel->id);

		// update
		$customIngredientModel->price = $input['customPrice'];

		$customIngredientModel->save();

		return $this->respondWithStatus(204);
	}



}