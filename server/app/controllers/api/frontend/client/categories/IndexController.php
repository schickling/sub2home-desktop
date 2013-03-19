<?php namespace App\Controllers\Api\Frontend\Client\Categories;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use Illuminate\Database\Eloquent\Collection;

use App\Models\CategoryModel;


class IndexController extends StoreRelatedApiController
{
	
	/**
	 * @GET('api/frontend/stores/{alias}/categories/assortment')
	 */
	public function route()
	{
		$categoriesCollection = CategoryModel::with(array(
												'articlesCollection'
												))
												->orderBy('order')
												->get();

		$preparedCategoriesCollection = $this->prepareCategoriesCollection($categoriesCollection);

		return $preparedCategoriesCollection->toJson(JSON_NUMERIC_CHECK);
	}

	private function prepareCategoriesCollection($categoriesCollection)
	{
		$storeModelId = $this->storeModel->id;

		foreach ($categoriesCollection as $categoryModel) {

			$articlesCollection = new Collection();
			$sortedArticlesCollection = $categoryModel->articlesCollection()
														->orderBy('order')
														->get();

			// get correct prices
			foreach ($sortedArticlesCollection as $articleModel) {
				if ($articleModel->isPublished) {

					// discard unused attributes
					unset($articleModel->allowsDeposit);
					unset($articleModel->allowsMenuUpgrades);
					unset($articleModel->largeImage);

					$customArticleModel = $articleModel->returnCustomModel($storeModelId);

					$articleModel->isActive = $customArticleModel->isActive;
					$articleModel->buyedInStore = $customArticleModel->buyed;

					$articleModel->customPrice = $customArticleModel->price;


					$articlesCollection->add($articleModel);
				}
			}

			$categoryModel->setRelation('articlesCollection', $articlesCollection);

			
		}

		return $categoriesCollection;
	}

}