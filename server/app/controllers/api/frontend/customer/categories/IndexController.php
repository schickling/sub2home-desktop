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
												'articlesCollection' => function($query)
												{
													$query->where('isPublished', true);
													$query->where('isOnlyAllowedByMenus', false);
												},
												'menuBundlesCollection' => function($query)
												{
													$query->where('isPublished', true);
												}
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

				$customItemModel = $itemModel->returnCustomModel($storeModelId);

				if ($customItemModel->isActive) {

					$itemModel->price = $customItemModel->price;

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