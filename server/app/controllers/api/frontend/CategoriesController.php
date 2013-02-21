<?php namespace App\Controllers\Api\Frontend;

use Illuminate\Database\Eloquent\Collection;

use Input;

use App\Models\CategoryModel;


class CategoriesController extends ApiController
{

	public function index($storeAlias)
	{
		$this->loadStoreModel();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}


		$categoriesCollection = CategoryModel::with(array(
												'articlesCollection',
												'menuBundlesCollection'
												))
												->orderBy('order')
												->get();

		// if client is logged in and changes his assortment
		if (Input::get('assortment')) {
			$preparedCategoriesCollection = $this->prepareCategoriesForAssortmentListing($categoriesCollection);
		} else {
			$preparedCategoriesCollection = $this->prepareCategoriesWithAllItems($categoriesCollection);
		}

		return $preparedCategoriesCollection->toJson(JSON_NUMERIC_CHECK);
	}

	private function prepareCategoriesWithAllItems($categoriesCollection)
	{
		$categoriesCollectionWithItems = new Collection();
		$store_model_id = $this->storeModel->id;

		// pick out "visible" categories
		foreach ($categoriesCollection as $categoryModel) {

			$itemsCollection = new Collection();
			$sortedItemsCollection = $categoryModel->sortedItemsCollection;

			// get correct prices
			foreach ($sortedItemsCollection as $itemModel) {
				if ($itemModel->isPublished && $itemModel->isActive($store_model_id)) {

					$itemModel->price = $itemModel->returnCustomPrice($store_model_id);

					// discard unused attributes
					unset($itemModel->allowsDeposit);
					unset($itemModel->allowsMenuUpgrades);
					unset($itemModel->smallImage);

					$itemsCollection->add($itemModel);
				}
			}

			if (!$itemsCollection->isEmpty()) {
				$categoryModel->setRelation('itemsCollection', $itemsCollection);

				// discard loaded relationships
				unset($categoryModel->articlesCollection);
				unset($categoryModel->menuBundlesCollection);

				$categoriesCollectionWithItems->add($categoryModel);
			}
		}

		return $categoriesCollectionWithItems;
	}

	private function prepareCategoriesForAssortmentListing($categoriesCollection)
	{
		$store_model_id = $this->storeModel->id;

		foreach ($categoriesCollection as $categoryModel) {

			$articlesCollection = new Collection();
			$sortedArticlesCollection = $categoryModel->articlesCollection()->orderBy('order')
																			->get();

			// get correct prices
			foreach ($sortedArticlesCollection as $articleModel) {
				if ($articleModel->isPublished) {

					// discard unused attributes
					unset($articleModel->allowsDeposit);
					unset($articleModel->allowsMenuUpgrades);
					unset($articleModel->largeImage);

					$customArticleModel = $articleModel->returnCustomModel($store_model_id);

					$articleModel->isActive = $customArticleModel->isActive;
					$articleModel->buyedInStore = $customArticleModel->buyed;

					$articlesCollection->add($articleModel);
				}
			}

			$categoryModel->setRelation('articlesCollection', $articlesCollection);

			// discard loaded relationships
			unset($categoryModel->menuBundlesCollection);

			
		}

		return $categoriesCollection;
	}

}