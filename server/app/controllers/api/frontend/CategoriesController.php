<?php namespace App\Controllers\Api\Frontend;

use App\Controllers\Api\ApiController;
use Illuminate\Database\Eloquent\Collection;
use CategoryModel;
use ArticleModel;


class CategoriesController extends ApiController
{

	
	public function index($storeAlias)
	{
		$this->loadStoreModel();

		$categoriesCollectionWithItems = new Collection();
		$categoriesCollection = CategoryModel::with('articlesCollection', 'menuBundlesCollection')
												->orderBy('order')
												->get();

		// pick out "visible" categories
		foreach ($categoriesCollection as $categoryModel) {

			$itemsCollection = new Collection();
			$orderedItemsCollection = $categoryModel->orderedItemsCollection;

			// get correct prices
			foreach ($orderedItemsCollection as $itemModel) {
				if ($itemModel->isPublished && $itemModel->isActive($this->storeModel->id)) {
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

		return $categoriesCollectionWithItems->toJson(JSON_NUMERIC_CHECK);
	}

}