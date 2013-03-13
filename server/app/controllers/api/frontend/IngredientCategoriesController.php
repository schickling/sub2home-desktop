<?php namespace App\Controllers\Api\Frontend;

use Illuminate\Database\Eloquent\Collection;

use App\Models\IngredientCategoryModel;


class IngredientCategoriesController extends ApiController
{

	public function index($storeAlias)
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}


		$ingredientCategoriesCollection = IngredientCategoryModel::with('ingredientsCollection')
																	->orderBy('order')
																	->get();


		$store_model_id = $this->storeModel->id;

		foreach ($ingredientCategoriesCollection as $ingredientCategoryModel) {
			foreach ($ingredientCategoryModel->ingredientsCollection as $ingredientModel) {
				$ingredientModel->customPrice = $ingredientModel->returnCustomPrice($store_model_id);
			}
		}

		return $ingredientCategoriesCollection->toJson(JSON_NUMERIC_CHECK);
	}


}