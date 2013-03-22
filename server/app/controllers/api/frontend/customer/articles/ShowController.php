<?php namespace App\Controllers\Api\Frontend\Customer\Articles;

use App\Controllers\Api\Frontend\Customer\ApiController;
use Request;

use App\Models\ArticleModel;
use App\Models\IngredientCategoryModel;

/**
 * Returns the article as json object respecting the store
 * including menuuprades, menucomponentblocks, menucomponentoptions and their articles
 * and the allowed ingredients
 */
class ShowController extends ApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/articles/{id}')
	 */
	public function route()
	{

		$id = Request::segment(6);
		$articleModel = ArticleModel::with(array(
											'ingredientsCollection',
											'menuUpgradesCollection',
											'menuUpgradesCollection.menuComponentBlocksCollection',
											'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection',
											'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection.menuComponentOptionArticlesCollection'
											))
										->where('isPublished', true)
										->find($id);

		$this->checkModelFound($articleModel);

		
		$customArticleModel = $articleModel->returnCustomModel($this->storeModel->id);

		if (!$customArticleModel->isActive) {
			$this->throwException(404);
		}


		// get article price
		$articleModel->price = $customArticleModel->price;

		// get menu upgrades price
		$this->prepareMenuUpgradesCollection($articleModel);

		// load custom ingredients
		$customArticleModel->loadCustomIngredientPrices();

		// wrap ingredients in their ingredient categories
		$this->wrapIngredientsInCategories($articleModel);
		

		return $articleModel->toJson(JSON_NUMERIC_CHECK);
	}


	private function prepareMenuUpgradesCollection($articleModel)
	{
		$store_model_id = $this->storeModel->id;

		foreach ($articleModel->menuUpgradesCollection as $key => $menuUpgradeModel) {
			$customMenuModel = $menuUpgradeModel->returnCustomModel($store_model_id);

			if ($customMenuModel->isActive) {
				$menuUpgradeModel->price = $customMenuModel->price;				
			} else {
				$articleModel->menuUpgradesCollection->offsetUnset($key);
			}

		}

		if ($articleModel->menuUpgradesCollection->isEmpty()) {
			unset($articleModel->menuUpgradesCollection);
		}
	}

	private function wrapIngredientsInCategories($articleModel)
	{
		$ingredientsCollectionOfArticle = $articleModel->ingredientsCollection;

		$ingredientCategoriesCollection = IngredientCategoryModel::orderBy('order')->get();

		foreach ($ingredientCategoriesCollection as $index => $ingredientCategoryModel) {

			// filter and reindex ingredients
			$filteredIngredients = array_values(array_filter($ingredientsCollectionOfArticle->all(), function($ingredientModel) use ($ingredientCategoryModel) {
				return $ingredientModel->ingredient_category_model_id == $ingredientCategoryModel->id;
			}));

			if (count($filteredIngredients) > 0) {
				$ingredientsCollection = $ingredientCategoryModel->newCollection($filteredIngredients);
				$ingredientCategoryModel->setRelation('ingredientsCollection', $ingredientsCollection);
			} else {
				// check this, might not work
				$ingredientCategoriesCollection->offsetUnset($index);
			}


		}

		if (!$ingredientCategoriesCollection->isEmpty()) {
			$articleModel->setRelation('ingredientCategoriesCollection', $ingredientCategoriesCollection);
		}

		unset($articleModel->ingredientsCollection);
	}

}