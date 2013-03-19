<?php namespace App\Controllers\Api\Frontend\Customer\Categories;

use App\Controllers\Api\Frontend\Customer\ApiController;
use Illuminate\Database\Eloquent\Collection;
use App\Models\CategoryModel;


class IndexController extends ApiController
{

	/**
	 * @GET('api/frontend/stores/{alias}/categories')
	 */
	public function route()
	{
		$categoriesCollection = CategoryModel::with(array(
												'articlesCollection',
												'menuBundlesCollection'
												))
												->orderBy('order')
												->get();

		$preparedCategoriesCollection = $this->prepareCategoriesCollection($categoriesCollection);

		return $preparedCategoriesCollection->toJson(JSON_NUMERIC_CHECK);
	}

	private function prepareCategoriesCollection($categoriesCollection)
	{
		$categoriesCollectionWithItems = new Collection();
		$storeModelId = $this->storeModel->id;

		// pick out "visible" categories
		foreach ($categoriesCollection as $categoryModel) {

			$itemsCollection = new Collection();
			$sortedItemsCollection = $categoryModel->sortedItemsCollection;

			// get correct prices
			foreach ($sortedItemsCollection as $itemModel) {
				if ($itemModel->isPublished and $itemModel->isActive($storeModelId)) {

					$itemModel->price = $itemModel->returnCustomPrice($storeModelId);

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

}