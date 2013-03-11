<?php namespace App\Controllers\Api\Frontend;

use Request;
use Input;
use Validator;

use App\Models\ArticleModel;
use App\Models\IngredientCategoryModel;

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

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		$articleModelId = Request::segment(6);
		$articleModel = ArticleModel::with(array(
			'ingredientsCollection',
			'menuUpgradesCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection',
			'menuUpgradesCollection.menuComponentBlocksCollection.menuComponentOptionsCollection.menuComponentOptionArticlesCollection'
			))->find($articleModelId);


		if ($articleModel == null || !$articleModel->isActive($this->storeModel->id)) {
			return $this->respondWithStatus(404);
		}

		$customArticleModel = $articleModel->returnCustomModel($this->storeModel->id);

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


	public function update()
	{
		// security
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// check input
		$input = Input::json();
		$rules = array(
			'customPrice'		=> 'numeric|required|min:0',
			'isActive'			=> 'boolean|required'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// fetch customArticleModel
		$id = Request::segment(6);
		$articleModel = ArticleModel::find($id);
		$customArticleModel = $articleModel->returnCustomModel($this->storeModel->id);

		// update
		$customArticleModel->isActive = $input['isActive'];
		$customArticleModel->price = $input['customPrice'];

		$customArticleModel->save();

		return $this->respondWithStatus(204);
	}



	private function prepareMenuUpgradesCollection($articleModel)
	{
		foreach ($articleModel->menuUpgradesCollection as $menuUpgradeModel) {
			$menuUpgradeModel->price = $menuUpgradeModel->returnCustomPrice($this->storeModel->id);
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