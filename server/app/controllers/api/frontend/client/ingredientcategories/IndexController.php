<?php namespace App\Controllers\Api\Frontend\Client\IngredientCategories;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use App\Models\IngredientCategoryModel;


class IndexController extends StoreRelatedApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/ingredientcategories')
	 */
	public function route()
	{

		$ingredientCategoriesCollection = IngredientCategoryModel::with('ingredientsCollection')
																	->orderBy('order')
																	->get();


		$storeModelId = $this->storeModel->id;

		foreach ($ingredientCategoriesCollection as $ingredientCategoryModel) {
			foreach ($ingredientCategoryModel->ingredientsCollection as $ingredientModel) {

				$customIngredientModel = $ingredientModel->returnCustomModel($storeModelId);

				$ingredientModel->isActive = $customIngredientModel->isActive;
				$ingredientModel->buyed = $customIngredientModel->buyed;
				$ingredientModel->customPrice = $customIngredientModel->price;

				$ingredientModel->unhideAttribute('buyed');

			}
		}

		return $ingredientCategoriesCollection->toJson(JSON_NUMERIC_CHECK);
	}


}