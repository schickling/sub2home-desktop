<?php namespace App\Controllers\Api\Frontend;

use Input;
use Illuminate\Database\Eloquent\Collection;
use DateTime;
use App\Controllers\Services\Payment\PaypalService;

use App\Models\OrderModel;
use App\Models\IngredientModel;
use App\Models\OrderedArticleModel;
use App\Models\OrderedItemModel;

/**
* 
*/
class OrderCreateController extends ApiController
{


	public function create()
	{
		// prepare
		$this->loadStoreModel();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}
		
		$input = Input::json();
		$orderModel = new OrderModel();


		// parse ordered items
		$orderedItemsCollection = $this->createOrderedItemsCollection($input->orderedItemsCollection);
		$orderModel->setRelation('orderedItemsCollection', $orderedItemsCollection);


		// recalculate and compare totals (relation to store needed)
		$orderModel->store_model_id = $this->storeModel->id;
		$orderModel->calculateTotal();

		if ($orderModel->total != $input->total) {
			var_dump($orderModel->total);
			return $this->respondWithStatus(400);
		}

		// save other order data
		$orderModel->paymentMethod = $input->paymentMethod;
		$orderModel->isDelivered = false;
		$orderModel->credit = $input->credit;
		$orderModel->comment = $input->comment;

		$orderModel->due_at = new DateTime();
		$orderModel->due_at->setTimestamp($input->due_at / 1000);

		// save order
		$orderModel->save();


		// save address
		$orderModel->addressModel()->create($this->prepareAddress($input->addressModel));

		// save ordered items since they are not yet in the database
		$this->saveTempRelations($orderModel);


		// TODO
		if ($orderModel->paymentMethod == 'paypal') {
			return $this->respondWithStatus(303, PaypalService::getCheckoutUrl($orderModel));
		} else {
			$orderModel->confirm();			
		}

	}

	public function testOrder()
	{
		// prepare
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		
		$testOrderModel = new OrderModel();
		$testOrderModel->store_model_id = $this->storeModel->id;

		$compensationOrderModel = new OrderModel();
		$compensationOrderModel->store_model_id = $this->storeModel->id;
		$compensationOrderModel->total = - $testOrderModel->total;


		$testOrderModel->save();
		$testOrderModel->confirm();

		$compensationOrderModel->save();
		$compensationOrderModel->confirm();

	}


	/**
	 * Creates the ordered items collection without saving it to the database
	 * 
	 * @param  array	$orderedItems
	 * @return object
	 */
	private function createOrderedItemsCollection($orderedItems)
	{
		// TODO
		$orderedItemsCollection = new Collection();

		foreach ($orderedItems as $orderedItem) {
			$orderedItemModel = new OrderedItemModel();
			$orderedItemModel->amount = $orderedItem->amount;

			// check if is menu bundle
			if ($orderedItem->menuBundleModel) {
				$orderedItemModel->menu_bundle_model_id = $orderedItemModel->menuBundleModel->id;
			}

			// add ordered articles
			foreach ($orderedItem->orderedArticlesCollection as $index => $orderedArticle) {
				// check first ordered article for menu upgrade
				if ($index == 0 && $orderedArticle->menuUpgradeModel) {
					$orderedItemModel->menu_upgrade_model_id = $orderedArticle->menuUpgradeModel->id;
				}

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

		$articleModel = $orderedArticleModel->articleModel;
			$ingredientCategoriesCollection = $orderedArticle->articleModel->ingredientCategoriesCollection;

		if ($articleModel->allowsIngredients && $ingredientCategoriesCollection) {

			// pick out selected ingredients and add to ingredients collection
			foreach ($ingredientCategoriesCollection as $ingredientCategory) {
				foreach ($ingredientCategory->ingredientsCollection as $ingredient) {
					if ($ingredient->isSelected) {
						$ingredientModel = IngredientModel::find($ingredient->id);
						$orderedArticleModel->ingredientsCollection->add($ingredientModel);
					}
				}
			}

		}

		return $orderedArticleModel;

	}


	private function prepareAddress($addressInput)
	{
		$address = array(
			'firstName'			=> $addressInput->firstName,
			'lastName'			=> $addressInput->lastName,
			'street'			=> $addressInput->street,
			'streetAdditional'	=> $addressInput->streetAdditional,
			'postal'			=> $addressInput->postal,
			'city'				=> $addressInput->city,
			'email'				=> $addressInput->email,
			'phone'				=> $addressInput->phone,
			);

		return $address;
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