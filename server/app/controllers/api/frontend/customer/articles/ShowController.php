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

		if ( ! $customArticleModel->isActive) {
			$this->throwException(404);
		}

		// get article price
		$articleModel->price = $customArticleModel->price;

		// get menu upgrades price and sort out inactive articles
		$this->prepareMenuUpgradesCollection($articleModel);

		// load custom ingredients
		$customArticleModel->loadCustomIngredientPrices();

		// wrap ingredients in their ingredient categories
		$this->wrapIngredientsInCategories($articleModel);
		

		return $articleModel->toJson(JSON_NUMERIC_CHECK);
	}


	private function prepareMenuUpgradesCollection($articleModel)
	{
		$menuUpgradesCollection = $articleModel->menuUpgradesCollection;

		foreach ($menuUpgradesCollection as $index => $menuUpgradeModel) {

			$customMenuModel = $menuUpgradeModel->returnCustomModel($this->storeModel->id);
			$preparedMenuComponentBlocksCollection = $this->getPreparedMenuComponentBlocksCollection($menuUpgradeModel->menuComponentBlocksCollection);

			$menuUpgradeModel->price = $customMenuModel->price;

			if ( ! $customMenuModel->isActive or $preparedMenuComponentBlocksCollection->isEmpty()) {
				$menuUpgradesCollection->offsetUnset($index);
			}

		}

		// check if collection is empty
		if ($menuUpgradesCollection->isEmpty()) {
			unset($articleModel->menuUpgradesCollection);
		}

	}

	private function wrapIngredientsInCategories($articleModel)
	{
		$ingredientsCollectionOfArticle = $articleModel->ingredientsCollection;

		$ingredientCategoriesCollection = IngredientCategoryModel::orderBy('order')->get();

		foreach ($ingredientCategoriesCollection as $index => $ingredientCategoryModel) {

			// filter ingredients
			$filteredIngredientModels = array_filter($ingredientsCollectionOfArticle->all(), function($ingredientModel) use ($ingredientCategoryModel) {
				return $ingredientModel->ingredient_category_model_id == $ingredientCategoryModel->id;
			});

			// set custom price and sort out inactive ingredients
			$preparedIngredientModels = $this->getPreparedIngredientModels($filteredIngredientModels);

			if (count($preparedIngredientModels) > 0) {
				$ingredientsCollection = $ingredientCategoryModel->newCollection($preparedIngredientModels);

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

	}

	private function getPreparedIngredientModels($ingredientModels)
	{
		foreach ($ingredientModels as $index => $ingredientModel) {
			$customIngredientModel = $ingredientModel->returnCustomModel($this->storeModel->id);

			if ( ! $customIngredientModel->isActive) {
				unset($ingredientModels[$index]);
			}

			$ingredientModel->price = $customIngredientModel->price;

			// use preset
			$ingredientModel->isSelected = $ingredientModel->pivot->isPreset;

		}

		return $ingredientModels;
	}

	private function getPreparedMenuComponentBlocksCollection($menuComponentBlocksCollection)
	{

		foreach ($menuComponentBlocksCollection as $menuComponentBlockIndex => $menuComponentBlockModel) {

			// cache menuComponentOptionsCollection
			$menuComponentOptionsCollection = $menuComponentBlockModel->menuComponentOptionsCollection;

			foreach ($menuComponentOptionsCollection as $menuComponentOptionIndex => $menuComponentOptionModel) {

				// cache menuComponentOptionArticlesCollection
				$menuComponentOptionArticlesCollection = $menuComponentOptionModel->menuComponentOptionArticlesCollection;

				foreach ($menuComponentOptionArticlesCollection as $menuComponentOptionArticleIndex => $menuComponentOptionArticleModel) {

					if (! $menuComponentOptionArticleModel->isActive($this->storeModel->id)) {
						$menuComponentOptionArticlesCollection->offsetUnset($menuComponentOptionArticleIndex);
					} else {
						// var_dump($menuComponentOptionModel->id);
					}

				}

				// reindex collection
				$menuComponentOptionArticlesCollection->values();

				if ($menuComponentOptionArticlesCollection->isEmpty()) {
					$menuComponentOptionsCollection->offsetUnset($menuComponentOptionIndex);
				}

			}

			// reindex collection
			$menuComponentOptionsCollection->values();

			if ($menuComponentOptionsCollection->isEmpty()) {
				$menuComponentBlocksCollection->offsetUnset($menuComponentBlockIndex);
			}

		}

		// reindex collection
		$menuComponentBlocksCollection->values();

		return $menuComponentBlocksCollection;
	}

}