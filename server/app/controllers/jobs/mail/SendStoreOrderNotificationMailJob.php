<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\BaseJob;
use Exception;
use Mail;

use App\Models\OrderModel;
use App\Models\IngredientCategoryModel;

class SendStoreOrderNotificationMailJob extends BaseJob {

	private $orderModel;

	protected function run()
	{
		$order_model_id = $this->data['order_model_id'];
		$this->orderModel = OrderModel::find($order_model_id);

		if ($this->orderModel == null) {
			throw new Exception('Invalid order to process');
		}

		$this->sendMail();
		
	}

	private function sendMail()
	{
		$storeModel = $this->orderModel->storeModel;
		$emailAddress = $storeModel->orderEmail;
		$addressModel = $storeModel->addressModel;
		$name = $addressModel->firstName . ' ' . $addressModel->lastName;
		$subject = sprintf('Neue Bestellung #%s', str_pad($this->orderModel->id, 8, '0', STR_PAD_LEFT));

		$data = $this->getDataForMail();

		Mail::send('emails.client.order.order', $data, function($mail) use ($emailAddress, $name, $subject)
		{
			$mail->from('bestellung@sub2home.com', 'sub2home');
			$mail->to($emailAddress, $name);
			$mail->subject($subject);
		});

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