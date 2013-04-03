<?php namespace App\Controllers\Jobs\Order;

use App\Controllers\Jobs\BaseJob;
use App\Models\OrderModel;

class ProcessOrderJob extends BaseJob {

	private $orderModel;

	protected function run()
	{
		$order_model_id = $this->data['order_model_id'];
		$this->orderModel = OrderModel::find($order_model_id);

		if ($this->orderModel == null) {
			$this->throwExecption('Invalid order to process');
		}

		$this->updateHowOftenAnItemWasBuyed();
		$this->assignToInvoiceOfMatchingMonth();
		$this->updateInvoiceOfMatchingMonth();

	}

	private function updateHowOftenAnItemWasBuyed()
	{
		$orderedItemsCollection = $this->orderModel->orderedItemsCollection;

		foreach ($orderedItemsCollection as $orderedItemModel) {

			$amount = $orderedItemModel->amount;
			$orderedArticlesCollection = $orderedItemModel->orderedArticlesCollection;

			foreach ($orderedArticlesCollection as $orderedArticleModel) {

				// increase article and custom article count
				$this->increaseBuyedCount($orderedArticleModel->articleModel, $amount);

				// increase ingredients and custom ingredient count
				if ($orderedArticleModel->hasIngredients) {

					foreach ($orderedArticleModel->ingredientsCollection as $ingredientModel) {
						$this->increaseBuyedCount($ingredientModel, $amount);
					}

				}
			}

			// increase menu and custom menu count
			if ($orderedItemModel->isMenu) {
				$this->increaseBuyedCount($orderedItemModel->menuModel, $amount);
			}

		}
	}

	private function assignToInvoiceOfMatchingMonth()
	{
		$orderModel = $this->orderModel;
		$storeModel = $orderModel->storeModel;
		$storeModel->checkInvoices();

		$createdDateTime = $orderModel->getDateTimeFor('created_at');
		$totalNumberOfMonthsSinceOrderCreation = getTotalNumberOfMonthsFromDateTime($createdDateTime);

		$invoiceModel = $storeModel->invoicesCollection()
									->where('timeSpan', $totalNumberOfMonthsSinceOrderCreation)
									->first();

		if ($invoiceModel == null) {
			$this->throwExecption('No invoice found for current order');
		}

		$invoiceModel->ordersCollection()->save($orderModel);

	}

	private function updateInvoiceOfMatchingMonth()
	{
		$orderModel = $this->orderModel;
		$invoiceModel = $orderModel->invoiceModel;
		
		$invoiceModel->total += $orderModel->total;
		$invoiceModel->save();

	}

	private function increaseBuyedCount($itemModel, $toAdd)
	{
		$itemModel->increaseBuyedCounter($toAdd);
		$itemModel->save();

		$customItemModel = $itemModel->returnCustomModel($this->orderModel->storeModel->id);
		$customItemModel->increaseBuyedCounter($toAdd);
		$customItemModel->save();
	}

}