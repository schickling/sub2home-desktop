<?php namespace App\Controllers\Jobs;

use Exception;

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
		$this->updateTotalTurnoverOfStore();
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

	private function updateTotalTurnoverOfStore()
	{
		$orderModel = $this->orderModel;
		$storeModel = $orderModel->storeModel;

		$storeModel->totalTurnover += $orderModel->total;
		$storeModel->save();
	}

	private function updateInvoiceOfMatchingMonth()
	{
		$orderModel = $this->orderModel;
		$storeModel = $orderModel->storeModel;
		$storeModel->checkInvoices();

		$createdTime = strtotime($orderModel->created_at);
		$monthOfOrder = date('n', $createdTime);
		$yearOfOrder = date('Y', $createdTime);

		$invoiceModel = $storeModel->invoicesCollection()
										->whereRaw('YEAR(timeSpan) = ' . $yearOfOrder)
										->whereRaw('MONTH(timeSpan) = ' . $monthOfOrder)
										->first();

		if ($invoiceModel == null) {
			throw new Exception('No invoice found for current order');
		}

		$invoiceModel->total += $orderModel->total;
		$invoiceModel->save();

	}


}