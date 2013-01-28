<?php namespace App\Controllers\Api\Frontend;

use Request;
use ArticleModel;
use IngredientCategoryModel;

/**
* 
*/
class ArticlesController extends ApiController
{

	/**
	 * Returns the article as json object respecting the store
	 * including menuuprades, menucomponentblocks, menucomponentoptions and their articles
	 * and the allowed ingredients
	 * 
	 * @return string
	 */
	public function show()
	{
		$this->loadStoreModel();

		$articleModelId = Request::segment(6);
		$articleModel = ArticleModel::with(array(
			'ingredientsCollection',
			'menuUpgradesCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection.categoryModel',
			'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection.menuComponentOptionArticlesCollection'
			))->find($articleModelId);


		if ($articleModel == null) {
			$this->error(404);
		}

		// get article price
		$articleModel->price = $articleModel->returnRealPrice($this->storeModel->id);

		// get menu upgrades price
		$this->prepareMenuUpgradesCollection($articleModel);

		// wrap ingredients in their ingredient categories
		$this->prepareIngredientCategoriesCollection($articleModel);
		

		return $articleModel->toJson(JSON_NUMERIC_CHECK);
	}



	private function prepareMenuUpgradesCollection($articleModel)
	{
		foreach ($articleModel->menuUpgradesCollection as $menuUpgradeModel) {
			$menuUpgradeModel->price = $menuUpgradeModel->returnRealPrice($this->storeModel->id);
		}

		if ($articleModel->menuUpgradesCollection->isEmpty()) {
			unset($articleModel->menuUpgradesCollection);
		}
	}

	private function prepareIngredientCategoriesCollection($articleModel)
	{
		$ingredientsCollectionOfArticle = $articleModel->ingredientsCollection;

		$ingredientCategoriesCollection = IngredientCategoryModel::orderBy('order')->get();

		foreach ($ingredientCategoriesCollection as $index => $ingredientCategoryModel) {

			$filteredIngredients = array_filter($ingredientsCollectionOfArticle->all(), function($ingredientModel) use ($ingredientCategoryModel) {
				return $ingredientModel->ingredient_category_model_id == $ingredientCategoryModel->id;
			});

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