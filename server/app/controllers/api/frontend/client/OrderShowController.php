<?php namespace App\Controllers\Api\Frontend\Client;

use Request;

use App\Models\OrderModel;

/**
* 
*/
class OrderShowController extends ApiController
{

	/**
	 * @GET('api/frontend/orders/{id}')
	 */
	public function show($id)
	{

		$orderModel = $this->getResourceModel();

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


	protected function getClientModelIdFromResourceModel()
	{
		$orderModel = $this->getResourceModel();
		$storeModel = $orderModel->storeModel;

		return $storeModel->clientModel->id;
	}

	protected function fetchResourceModel() {
		$id = Request::segment(4);

		return OrderModel::with(array(
			'orderedItemsCollection',
			'orderedItemsCollection.orderedArticlesCollection',
			'orderedItemsCollection.orderedArticlesCollection.articleModel',
			'orderedItemsCollection.orderedArticlesCollection.ingredientsCollection',
			'addressModel'
			))
		->find($id);
	}


}