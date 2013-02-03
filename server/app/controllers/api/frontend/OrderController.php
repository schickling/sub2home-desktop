<?php namespace App\Controllers\Api\Frontend;

use OrderModel;
use AddressModel;
use IngredientModel;
use OrderedArticleModel;
use OrderedItemModel;
use Input;
use Illuminate\Database\Eloquent\Collection;

/**
* 
*/
class OrderController extends ApiController
{


	public function create()
	{
		// prepare
		$this->loadStoreModel();
		$input = Input::json();
		$orderModel = new OrderModel();


		// parse ordered items
		$orderedItemsCollection = $this->createOrderedItemsCollection($input->orderedItemsCollection);
		$orderModel->setRelation('orderedItemsCollection', $orderedItemsCollection);


		var_dump($orderModel->orderedItemsCollection->toArray());

		// recalculate and compare totals
		$orderModel->calculateTotal();

		if ($orderModel->total != $input->total) {
			// $this->error(400);
		}

		// save other order data
		$orderModel->paymentMethod = $input->paymentMethod;
		$orderModel->isDelivered = false;
		$orderModel->credit = $input->credit;
		$orderModel->store_model_id = $this->storeModel->id;

		// save order
		$orderModel->save();


		// save address
		$addressModel = $this->createAddressModel($input->addressModel);
		$orderModel->addressModel()->save($addressModel);

		// save ordered items since they are not yet in the database
		$this->saveTempRelations($orderModel);

		// var_dump($input);
	}


	/**
	 * Creates the ordered items collection without saving it to the database
	 * 
	 * @param  array	$orderedItems
	 * @return object
	 */
	private function createOrderedItemsCollection($orderedItems)
	{
		$orderedItemsCollection = new Collection();

		foreach ($orderedItems as $orderedItem) {
			$orderedItemModel = new OrderedItemModel();

			// check if as menu

			// add ordered articles
			foreach ($orderedItem->orderedArticlesCollection as $orderedArticle) {
				$orderedArticleModel = $this->createOrderedArticleModel($orderedArticle);
				$orderedItemModel->orderedArticlesCollection->add($orderedArticleModel);
			}

			$orderedItemsCollection->add($orderedItemModel);
		}

		return $orderedItemsCollection;
	}


	private function createOrderedArticleModel($orderedArticle)
	{
		$orderedArticleModel = new OrderedArticleModel();

		$orderedArticleModel->article_model_id = $orderedArticle->articleModel->id;

		// pick out selected ingredients and add to ingredients collection
		$ingredientCategoriesCollection = $orderedArticle->articleModel->ingredientCategoriesCollection;
		foreach ($ingredientCategoriesCollection as $ingredientCategory) {
			foreach ($ingredientCategory->ingredientsCollection as $ingredient) {
				if ($ingredient->isSelected) {
					$ingredientModel = IngredientModel::find($ingredient->id);
					$orderedArticleModel->ingredientsCollection->add($ingredientModel);
				}
			}
		}

		return $orderedArticleModel;

	}


	private function createAddressModel($address)
	{
		$addressModel = new AddressModel();

		$addressModel->firstName = $address->firstName;
		$addressModel->lastName = $address->lastName;
		$addressModel->street = $address->street;
		$addressModel->streetAdditional = $address->streetAdditional;
		$addressModel->postal = $address->postal;
		$addressModel->city = $address->city;
		$addressModel->email = $address->email;
		$addressModel->phone = $address->phone;

		return $addressModel;
	}


	private function saveTempRelations($orderModel)
	{
		foreach ($orderModel->orderedItemsCollection as $orderedItemModel) {
			$orderModel->orderedItemsCollection()->save($orderedItemModel);

			foreach ($orderedItemModel->orderedArticlesCollection as $orderedArticleModel) {
				$orderedItemModel->orderedArticlesCollection()->save($orderedArticleModel);

				foreach ($orderedArticleModel->ingredientsCollection as $ingredientModel) {
					$orderedArticleModel->ingredientsCollection()->attach($ingredientModel->id);
				}
			}
		}
	}


}