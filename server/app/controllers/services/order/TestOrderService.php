<?php namespace App\Controllers\Services\Order;

use DateTime;
use App\Models\OrderModel;
use App\Models\StoreModel;
use App\Models\OrderedArticleModel;
use App\Models\OrderedItemModel;
use App\Models\AddressModel;
use App\Models\CreditModel;

class TestOrderService
{

	public static function generateForStore($store_model_id, $isBalanced = false, $createdAtDateTime = null)
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
		$orderModel->addressModel()->save(static::getTestAddressModelForStore($storeModel));

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
			
			$creditModel = new CreditModel();
			$creditModel->total = $orderModel->total;
			$creditModel->isAccepted = true;
			$creditModel->description = 'Testbestellung';

			$orderModel->creditModel()->save($creditModel);

			$creditModel->confirm();

		}
	}

	private static function getTestAddressModelForStore($storeModel)
	{
		
		$deliveryArea = $storeModel->deliveryAreasCollection->first();

		if ($deliveryArea == null) {
			$this->throwException('Store has no delivery area');
		}

		$validPostal = $deliveryArea->postal;
		$validCity = $deliveryArea->city;

		$addressData = array(
			'firstName'			=> 'Max',
			'lastName'			=> 'Mustermann',
			'street'			=> 'Bahnhofstr. 4',
			'streetAdditional'	=> 'Zweiter Stock',
			'postal'			=> $validPostal,
			'city'				=> $validCity,
			'email'				=> 'max@mustermann.de',
			'phone'				=> '08731 000000'
			);

		return new AddressModel($addressData);
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