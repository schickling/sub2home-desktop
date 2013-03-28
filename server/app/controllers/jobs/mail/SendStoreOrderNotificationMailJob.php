<?php namespace App\Controllers\Jobs\Mail;

use App\Models\OrderModel;
use App\Models\IngredientCategoryModel;

class SendStoreOrderNotificationMailJob extends BaseMailJob {

	private $orderModel;

	protected function prepareData()
	{
		// fetch order model
		$order_model_id = $this->data['order_model_id'];
		$this->orderModel = OrderModel::find($order_model_id);

		if ($this->orderModel == null) {
			$this->throwExecption('Invalid order to process');
		}

		$storeModel = $this->orderModel->storeModel;
		$storeAddressModel = $storeModel->addressModel;

		// set properties
		$this->senderMail = 'bestellung@sub2home.com';
		$this->senderName = 'sub2home';
		$this->receiverMail = $storeModel->orderEmail;
		$this->receiverName = $storeAddressModel->firstName . ' ' . $storeAddressModel->lastName;
		$this->subject = sprintf('Neue Bestellung #%s', str_pad($this->orderModel->id, 8, '0', STR_PAD_LEFT));
		$this->viewName = 'emails.client.order.order';
		$this->viewData = $this->getDataForMail();
	}

	private function getDataForMail()
	{
		$orderModel = $this->orderModel;
		$storeModel = $this->orderModel->storeModel;
		$addressModelOfCustomer = $orderModel->addressModel;
		$addressModelOfStore = $storeModel->addressModel;

		$this->prepareIngredientCategories();

		$data = array(
			'customerFirstName'			=> $addressModelOfCustomer->firstName,
			'customerLastName'			=> $addressModelOfCustomer->lastName,
			'customerStreet'			=> $addressModelOfCustomer->street,
			'customerPostal'			=> $addressModelOfCustomer->postal,
			'customerCity'				=> $addressModelOfCustomer->city,
			'customerEmail'				=> $addressModelOfCustomer->email,
			'customerPhone'				=> $addressModelOfCustomer->phone,
			'storeStreet'				=> $addressModelOfStore->street,
			'storePostal'				=> $addressModelOfStore->postal,
			'storeCity'					=> $addressModelOfStore->city,
			'orderNumber'				=> str_pad($orderModel->id, 8, '0', STR_PAD_LEFT),
			'orderedItemsCollection'	=> $orderModel->orderedItemsCollection
			);

		return $data;
	}

	private function prepareIngredientCategories()
	{
		$orderedItemsCollection = $this->orderModel->orderedItemsCollection;

		foreach ($orderedItemsCollection as $orderedItemModel) {
			foreach ($orderedItemModel->orderedArticlesCollection as $orderedArticleModel) {
				$articleModel = $orderedArticleModel->articleModel;

				if ($articleModel->allowsIngredients) {
					$this->wrapIngredientsInCategories($orderedArticleModel);
				}
			}
		}
	}

	private function wrapIngredientsInCategories($orderedArticleModel)
	{
		$ingredientsCollectionOfArticle = $orderedArticleModel->ingredientsCollection;

		$ingredientCategoriesCollection = IngredientCategoryModel::orderBy('order')->get();

		foreach ($ingredientCategoriesCollection as $index => $ingredientCategoryModel) {

			// filter and reindex ingredients
			$filteredIngredients = array_values(array_filter($ingredientsCollectionOfArticle->all(), function($ingredientModel) use ($ingredientCategoryModel) {
				return $ingredientModel->ingredient_category_model_id == $ingredientCategoryModel->id;
			}));

			if (count($filteredIngredients) > 0) {
				$ingredientsCollection = $ingredientCategoryModel->newCollection($filteredIngredients);
				$ingredientCategoryModel->setRelation('ingredientsCollection', $ingredientsCollection);
			} else {
				// TODO: check this, might not work
				$ingredientCategoriesCollection->offsetUnset($index);
			}


		}

		if (!$ingredientCategoriesCollection->isEmpty()) {
			$orderedArticleModel->setRelation('ingredientCategoriesCollection', $ingredientCategoriesCollection);
		}

		unset($orderedArticleModel->ingredientsCollection);
	}


}