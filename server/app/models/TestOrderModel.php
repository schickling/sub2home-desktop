<?php namespace App\Models;

use DateTime;

class TestOrderModel extends OrderModel
{

	public static function generateTestOrderForStore($store_model_id, $isBalanced = false, $createdAtDateTime = null)
	{
		if (!$createdAtDateTime) {
			$createdAtDateTime = new DateTime();
		}

		$storeModel = StoreModel::find($store_model_id);

		if ($storeModel == null) {
			$this->throwException('No store model found');
		}

		$storeModelCreatedAtDateTime = $storeModel->getDateTimeFor('created_at');

		if ($createdAtDateTime < $storeModelCreatedAtDateTime) {
			$this->throwException('Store didn\'t exist when this order was generated');
		}

		// create test order
		$orderModel = new OrderModel();
		$orderModel->store_model_id = $store_model_id;
		$orderModel->commissionRate = $storeModel->commissionRate;
		$orderModel->isDelivered = true;
		$orderModel->comment = 'Testbestellungen';

		$orderModel->save();
		$orderModel->addressModel()->create(static::getTestAddressForStore($storeModel));

		// set timestamps after first save
		$orderModel->created_at = $createdAtDateTime;
		$orderModel->due_at = $createdAtDateTime;
		$orderModel->save();

		static::createOrderedItemsForTestOrder($orderModel);
		$orderModel->calculateTotal();
		$orderModel->save();

		$orderModel->confirm();


		// create balance order
		if ($isBalanced) {
			$balanceOrderModel = new OrderModel();
			$balanceOrderModel->store_model_id = $store_model_id;
			$balanceOrderModel->commissionRate = $storeModel->commissionRate;
			$balanceOrderModel->isDelivered = true;
			$balanceOrderModel->comment = 'Testbestellung Ausgleich';
			$balanceOrderModel->order_model_id = $orderModel->id; // set reference to belonging order model
			$balanceOrderModel->setRelation('balanceOrderModel', $orderModel);
			$balanceOrderModel->setBalance(-$orderModel->total);

			$balanceOrderModel->save();
			$balanceOrderModel->addressModel()->create(static::getTestAddressForStore($storeModel));

			// set timestamps after first save
			$balanceOrderModel->created_at = $createdAtDateTime;
			$balanceOrderModel->due_at = $createdAtDateTime;
			$balanceOrderModel->save();

			$balanceOrderModel->confirm();
		}
	}

	private static function getTestAddressForStore($storeModel)
	{
		
		$deliveryArea = $storeModel->deliveryAreasCollection->first();

		if ($deliveryArea == null) {
			$this->throwException('Store has no delivery area');
		}

		$validPostal = $deliveryArea->postal;
		$validCity = $deliveryArea->city;

		return array(
			'firstName'			=> 'Max',
			'lastName'			=> 'Mustermann',
			'street'			=> 'Bahnhofstr. 4',
			'streetAdditional'	=> 'Zweiter Stock',
			'postal'			=> $validPostal,
			'city'				=> $validCity,
			'email'				=> 'max@mustermann.de',
			'phone'				=> '08731 000000'
			);
	}

	private static function createOrderedItemsForTestOrder($orderModel)
	{
		// TODO rewrite with collection helpers
		$orderedItemModel = new OrderedItemModel();
		$orderedItemModel->order_model_id = $orderModel->id;
		$orderedItemModel->amount = 3;
		$orderedItemModel->save();

		$storeModel = $orderModel->storeModel;
		$firstActiveCustomArticle = $storeModel->customArticlesCollection()->where('isActive', true)->first();

		if ($firstActiveCustomArticle == null) {
			$this->throwException('No article is active');
		}

		$firstArticleModel = $firstActiveCustomArticle->articleModel;

		$orderedArticleModel = new OrderedArticleModel();
		$orderedArticleModel->article_model_id = $firstArticleModel->id;
		$orderedArticleModel->ordered_item_model_id = $orderedItemModel->id;
		$orderedArticleModel->save();

		$orderedItemModel->calculateTotal();
		$orderedItemModel->save();

	}

}