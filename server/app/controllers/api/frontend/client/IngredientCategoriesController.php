<?php namespace App\Controllers\Api\Frontend\Client;

use App\Models\IngredientCategoryModel;


class IngredientCategoriesController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/ingredientcategories')
	 */
	public function index()
	{

		$ingredientCategoriesCollection = IngredientCategoryModel::with('ingredientsCollection')
																	->orderBy('order')
																	->get();


		$storeModelId = $this->storeModel->id;

		foreach ($ingredientCategoriesCollection as $ingredientCategoryModel) {
			foreach ($ingredientCategoryModel->ingredientsCollection as $ingredientModel) {
				$ingredientModel->customPrice = $ingredientModel->returnCustomPrice($storeModelId);
			}
		}

		return $ingredientCategoriesCollection->toJson(JSON_NUMERIC_CHECK);
	}


}