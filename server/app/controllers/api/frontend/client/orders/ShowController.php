<?php namespace App\Controllers\Api\Frontend\Client\Orders;

use App\Controllers\Api\Frontend\Client\ApiController;
use Request;

use App\Models\OrderModel;
use App\Models\IngredientCategoryModel;

/**
* 
*/
class ShowController extends ApiController
{

	/**
	 * @GET('api/frontend/orders/{id}')
	 */
	public function route()
	{

		$orderModel = $this->getResourceModel();

		foreach ($orderModel->orderedItemsCollection as $orderedItemModel) {
			foreach ($orderedItemModel->orderedArticlesCollection as $orderedArticleModel) {
				$this->wrapIngredientsInCategories($orderedArticleModel);
			}
		}

		return $orderModel->toJson(JSON_NUMERIC_CHECK);

	}


	protected function getClientModelIdFromResourceModel()
	{
		$orderModel = $this->getResourceModel();
		$storeModel = $orderModel->storeModel;

		return $storeModel->client_model_id;
	}

	protected function fetchResourceModel() {
		$id = Request::segment(4);

		return OrderModel::with(array(
								'orderedItemsCollection',
								'orderedItemsCollection.orderedArticlesCollection',
								'orderedItemsCollection.orderedArticlesCollection.articleModel',
								'orderedItemsCollection.orderedArticlesCollection.ingredientsCollection',
								'addressModel'
								))
							->find($id);
	}

	private function wrapIngredientsInCategories($orderedArticleModel)
	{
		$articleModel = $orderedArticleModel->articleModel;
		$selectedIngredientsCollectionOfOrderedArticle = $orderedArticleModel->ingredientsCollection;

		$ingredientCategoriesCollection = IngredientCategoryModel::orderBy('order')->get();

		foreach ($ingredientCategoriesCollection as $index => $ingredientCategoryModel) {

			// filter ingredients
			$filteredIngredientModels = array_filter($selectedIngredientsCollectionOfOrderedArticle->all(), function($ingredientModel) use ($ingredientCategoryModel) {
				return $ingredientModel->ingredient_category_model_id == $ingredientCategoryModel->id;
			});

			if (count($filteredIngredientModels) > 0) {
				$ingredientsCollection = $ingredientCategoryModel->newCollection($filteredIngredientModels);

				// reindex collection
				$ingredientsCollection->values();

				$ingredientCategoryModel->setRelation('ingredientsCollection', $ingredientsCollection);
			} else {
				// TODO: check this, might not work
				$ingredientCategoriesCollection->offsetUnset($index);
			}

		}

		// check if collection is empty
		if ( ! $ingredientCategoriesCollection->isEmpty()) {

			// reindex collection
			$ingredientCategoriesCollection->values();

			$articleModel->setRelation('ingredientCategoriesCollection', $ingredientCategoriesCollection);
		}

		unset($articleModel->ingredientsCollection);
		unset($orderedArticleModel->ingredientsCollection);

	}


}