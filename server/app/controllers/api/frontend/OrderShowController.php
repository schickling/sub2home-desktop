<?php namespace App\Controllers\Api\Frontend;

use OrderModel;
use Input;

/**
* 
*/
class OrderShowController extends ApiController
{


	public function show($id)
	{
		$orderModel = OrderModel::with(array(
			'orderedItemsCollection',
			'orderedItemsCollection.orderedArticlesCollection',
			'orderedItemsCollection.orderedArticlesCollection.articleModel',
			'orderedItemsCollection.orderedArticlesCollection.ingredientsCollection',
			'addressModel'
			))
		->find($id);

		if (!$orderModel) {
			$this->error(404);
		}

		foreach ($orderModel->orderedItemsCollection as $orderedItemModel) {
			foreach ($orderedItemModel->orderedArticlesCollection as $orderedArticleModel) {
				$ingredientsCollection = $orderedArticleModel->ingredientsCollection;
				$articleModel = $orderedArticleModel->articleModel;
				$articleModel->setRelation('ingredientsCollection', $ingredientsCollection);
				unset($orderedArticleModel->ingredientsCollection);
			}
		}

		return $orderModel->toJson(JSON_NUMERIC_CHECK);

	}


}