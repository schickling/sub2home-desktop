<?php namespace App\Controllers\Api\Frontend;

use Illuminate\Database\Eloquent\Collection;

use App\Models\CategoryModel;
use App\Models\ArticleModel;


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
			// TODO: make that more convenient
			$sortedItemsCollection = $categoryModel->sortedItemsCollection;

			// get correct prices
			foreach ($sortedItemsCollection as $itemModel) {
				if ($itemModel->isPublished && $itemModel->isActive($this->storeModel->id)) {


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

		return $categoriesCollectionWithItems->toJson(JSON_NUMERIC_CHECK);
	}

}