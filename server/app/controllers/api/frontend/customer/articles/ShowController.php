<?php namespace App\Controllers\Api\Frontend\Customer\Articles;

use App\Controllers\Api\Frontend\Customer\ItemApiController;
use Request;

use App\Models\ArticleModel;
use App\Models\IngredientCategoryModel;

/**
 * Returns the article as json object respecting the store
 * including menuuprades, menucomponentblocks, menucomponentoptions and their articles
 * and the allowed ingredients
 */
class ShowController extends ItemApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/articles/{id}')
	 */
	public function route()
	{

		$id = Request::segment(6);
		$articleModel = ArticleModel::with(array(
											'ingredientsCollection' => function($query)
											{
												$query->where('isPublished', true);
											},
											'menuUpgradesCollection',
											'menuUpgradesCollection.menuComponentBlocksCollection',
											'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection',
											'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection.menuComponentOptionArticlesCollection' => function($query)
											{
												$query->where('isPublished', true);
											}
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

			// set custom price
			$customMenuModel = $menuUpgradeModel->returnCustomModel($this->storeModel->id);
			$menuUpgradeModel->price = $customMenuModel->price;

			// prepare menu components
			$menuComponentBlocksCollection = $menuUpgradeModel->menuComponentBlocksCollection;
			$this->sortOutInactiveArticles($menuComponentBlocksCollection);

			if ( ! $customMenuModel->isActive or $menuComponentBlocksCollection->isEmpty()) {
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

}