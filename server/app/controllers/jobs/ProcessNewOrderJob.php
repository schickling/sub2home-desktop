<?php namespace App\Controllers\Jobs;

use App\Models\OrderModel;
use Exception;

class ProcessNewOrderJob implements JobInterface {

	private $orderModel;

	public function fire($job, $data)
	{
		$order_model_id = $data['order_model_id'];
		$this->orderModel = OrderModel::find($order_model_id);

		if ($this->orderModel == null) {
			throw new Exception('Invalid order to process');
		}

		$this->updateHowOftenAnItemWasBuyed();
		$this->updateTotalTurnoverOfStore();

		$job->delete();
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


}