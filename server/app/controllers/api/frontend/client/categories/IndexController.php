<?php namespace App\Controllers\Api\Frontend\Client\Categories;

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
		$store_model_id = $this->storeModel->id;

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

					$customArticleModel = $articleModel->returnCustomModel($store_model_id);

					$articleModel->isActive = $customArticleModel->isActive;
					$articleModel->buyedInStore = $customArticleModel->buyed;

					$articleModel->customPrice = $customArticleModel->price;


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