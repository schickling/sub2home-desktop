<?php namespace App\Controllers\Api\Frontend\Customer;

use Request;

use App\Models\MenuBundleModel;

/**
* 
*/
abstract class ItemApiController extends ApiController
{

	protected function sortOutInactiveArticles($menuComponentBlocksCollection)
	{

		foreach ($menuComponentBlocksCollection as $menuComponentBlockIndex => $menuComponentBlockModel) {

			// cache menuComponentOptionsCollection
			$menuComponentOptionsCollection = $menuComponentBlockModel->menuComponentOptionsCollection;

			foreach ($menuComponentOptionsCollection as $menuComponentOptionIndex => $menuComponentOptionModel) {

				// cache menuComponentOptionArticlesCollection
				$menuComponentOptionArticlesCollection = $menuComponentOptionModel->menuComponentOptionArticlesCollection;

				foreach ($menuComponentOptionArticlesCollection as $menuComponentOptionArticleIndex => $menuComponentOptionArticleModel) {

					if ( ! $menuComponentOptionArticleModel->isActive($this->storeModel->id)) {
						$menuComponentOptionArticlesCollection->offsetUnset($menuComponentOptionArticleIndex);
					}

				}

				// reindex collection
				$menuComponentOptionArticlesCollection->values();

				if ($menuComponentOptionArticlesCollection->isEmpty()) {
					$menuComponentOptionsCollection->offsetUnset($menuComponentOptionIndex);
				}

			}

			// reindex collection
			$menuComponentOptionsCollection->values();

			if ($menuComponentOptionsCollection->isEmpty()) {
				$menuComponentBlocksCollection->offsetUnset($menuComponentBlockIndex);
			}

		}

		// reindex collection
		$menuComponentBlocksCollection->values();

	}


}