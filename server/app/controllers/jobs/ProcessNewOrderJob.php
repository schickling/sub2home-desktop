<?php namespace App\Controllers\Jobs;

use Exception;
use DateTime;

use App\Models\OrderModel;

class ProcessNewOrderJob extends BaseJob {

	private $orderModel;

	protected function run()
	{
		$order_model_id = $this->data['order_model_id'];
		$this->orderModel = OrderModel::find($order_model_id);

		if ($this->orderModel == null) {
			throw new Exception('Invalid order to process');
		}

		$this->updateHowOftenAnItemWasBuyed();
		$this->updateInvoiceOfMatchingMonth();

	}

	private function updateHowOftenAnItemWasBuyed()
	{
		$orderedItemsCollection = $this->orderModel->orderedItemsCollection;

		foreach ($orderedItemsCollection as $orderedItemModel) {

			$orderedArticlesCollection = $orderedItemModel->orderedArticlesCollection;

			foreach ($orderedArticlesCollection as $orderedArticleModel) {
				$articleModel = $orderedArticleModel->articleModel;
				$customArticleModel = $articleModel->returnCustomModel($this->orderModel->storeModel->id);

				$articleModel->buyed += $orderedArticleModel->amount;
				$articleModel->save();

				$customArticleModel->buyed += $orderedArticleModel->amount;
				$customArticleModel->save();
			}

			// TODO add menu support

		}
	}

	private function updateInvoiceOfMatchingMonth()
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
			throw new Exception('No invoice found for current order');
		}

		// TODO check attach
		$orderModel->invoice_model_id = $invoiceModel->id;
		$orderModel->save();

		$invoiceModel->total += $orderModel->total;
		$invoiceModel->save();

	}


}