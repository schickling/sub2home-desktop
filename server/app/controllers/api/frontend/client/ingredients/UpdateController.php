<?php namespace App\Controllers\Api\Frontend\Client\Ingredients;

use Input;
use Validator;
use Request;
use App\Exceptions\NotFoundException;

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
		$input = Input::json();
		$rules = array(
			'customPrice' => 'numeric|required|min:0'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// fetch customIngredientModel
		$id = Request::segment(6);
		$ingredientModel = IngredientModel::find($id);

		// check if found
    	if (is_null($ingredientModel)) {
    		throw new NotFoundException();
    	}

		$customIngredientModel = $ingredientModel->returnCustomModel($this->storeModel->id);

		// update
		$customIngredientModel->price = $input['customPrice'];
		$customIngredientModel->save();

		return $this->respondWithStatus(204);
	}

}