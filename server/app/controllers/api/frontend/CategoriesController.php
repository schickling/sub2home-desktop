<?php namespace App\Controllers\Api\Frontend;

use App\Controllers\Api\ApiController;
use Illuminate\Database\Eloquent\Collection;
use CategoryModel;


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
			foreach ($orderedItemsCollection as $item) {
				if ($item->isPublished && $item->isActive($this->storeModel->id)) {
					$item->price = $item->returnRealPrice($this->storeModel->id);
					$item->image = $item->getImageBig();
					$itemsCollection->add($item);
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