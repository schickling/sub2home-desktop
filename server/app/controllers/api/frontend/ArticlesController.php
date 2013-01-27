<?php namespace App\Controllers\Api\Frontend;

use App\Controllers\Api\ApiController;

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
	public function show($storeAlias, $id)
	{
		$this->loadStoreModel();

		$id = Request::segment(6);
		$articleModel = ArticleModel::with(array(
			'ingredientsCollection',
			'menuUpgradesCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection.categoryModel',
			'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection.articlesCollection'
			))->find($id);


		if ($articleModel == null) {
			return Response::make('', 404);
		}



		// // FIELDS

		$articleModel->price = $articleModel->returnRealPrice($this->storeModel->id);


	    // fetch menu upgrades
		foreach ($articleModel->menuUpgradesCollection as $menuUpgradeModel) {

			foreach ($menuUpgradeModel->menuComponentBlocksCollection as $menuComponentBlockModel) {

				foreach ($menuComponentBlockModel->menuComponentOptionsCollection as $menuComponentOptionModel) {

					$menuComponentOptionModel->menuComponentOptionArticlesCollection = $menuComponentOptionModel->articlesCollection;

					foreach ($menuComponentOptionModel->menuComponentOptionArticlesCollection as $optionArticleModel) {

						// price is zero because article is part of a menu upgrade
						$optionArticleModel->price = 0;


					}
				}
			}
		}


		// INGREDIENTS

		// wrap ingredients in their ingredient categories

		$ingredientsCollectionOfArticle = $articleModel->ingredientsCollection;

		$ingredientCategoriesCollection = IngredientCategoryModel::orderBy('order')->get();

		foreach ($ingredientCategoriesCollection as $ingredientCategoryModel) {

			$filteredIngredients = array_filter($ingredientsCollectionOfArticle->all(), function($ingredientModel) use ($ingredientCategoryModel) {
				return $ingredientModel->ingredient_category_model_id == $ingredientCategoryModel->id;
			});

			$ingredientsCollection = $ingredientCategoryModel->newCollection($filteredIngredients);

			$ingredientCategoryModel->setRelation('ingredientsCollection', $ingredientsCollection);

		}

		$articleModel->setRelation('ingredientCategoriesCollection', $ingredientCategoriesCollection);

		unset($articleModel->ingredientsCollection);


		// RETURN

		return $articleModel->toJson(JSON_NUMERIC_CHECK);
	}

}