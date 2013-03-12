<?php namespace App\Controllers\Api\Frontend;

use Input;
use Illuminate\Database\Eloquent\Collection;
use DateTime;
use App\Controllers\Services\Payment\PaypalService;

use App\Models\OrderModel;
use App\Models\AddressModel;
use App\Models\TestOrderModel;
use App\Models\IngredientModel;
use App\Models\OrderedArticleModel;
use App\Models\OrderedItemModel;

/**
* 
*/
class OrderCreateController extends ApiController
{

	private $orderModel;


	public function create()
	{
		// prepare
		$this->loadStoreModel();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}
		
		$input = Input::json();
		$orderModel = new OrderModel();
		$this->orderModel = $orderModel;

		// set store model id (needed for tmp relations)
		$orderModel->store_model_id = $this->storeModel->id;


		// parse ordered items and create temporary relations
		$orderedItemsCollection = $this->createOrderedItemsCollection($input['orderedItemsCollection']);
		$orderModel->setRelation('orderedItemsCollection', $orderedItemsCollection);


		// recalculate and compare totals (relation to store needed for custom prices)
		$orderModel->store_model_id = $this->storeModel->id;
		$orderModel->calculateTotal();

		if ($orderModel->total != $input['total']) {
			var_dump($orderModel->total);
			return $this->respondWithStatus(400);
		}

		// set current commision rate
		$orderModel->commissionRate = $this->storeModel->commissionRate;

		// set other order data
		$orderModel->paymentMethod = $input['paymentMethod'];
		$orderModel->isDelivered = false;
		$orderModel->credit = $input['credit'];
		$orderModel->comment = $input['comment'];

		$orderModel->due_at = new DateTime();
		$orderModel->due_at->setTimestamp($input['due_at'] / 1000);

		// create tmp address model
		$this->createTempAddressModel($input['addressModel']);


		if (!$orderModel->isValid()) {
			return $this->respondWithStatus(400);
		}


		// save order
		$orderModel->save();


		// save ordered items since they are not yet in the database
		$this->saveTempRelations($orderModel);


		// TODO
		if ($orderModel->paymentMethod == 'paypal') {
			return $this->respondWithStatus(303, PaypalService::getCheckoutUrl($orderModel));
		} else {
			$orderModel->confirm();			
		}

		return $this->respondWithStatus(204);

	}

	public function testOrder()
	{
		// prepare
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		TestOrderModel::generateTestOrderForStore($this->storeModel->id, true);

		return $this->respondWithStatus(204);
	}


	/**
	 * Creates the ordered items collection without saving it to the database
	 * 
	 * @param  array	$orderedItemsInput
	 * @return object
	 */
	private function createOrderedItemsCollection($orderedItemsInput)
	{
		// TODO
		$orderedItemsCollection = new Collection();

		foreach ($orderedItemsInput as $orderedItemInput) {
			$orderedItemModel = new OrderedItemModel();
			$orderedItemModel->amount = $orderedItemInput['amount'];

			// set link to order model
			$orderedItemModel->setRelation('orderModel', $this->orderModel);


			// check if is menu bundle
			if ($orderedItemInput['menuBundleModel']) {
				$orderedItemModel->menu_bundle_model_id = $orderedItemModel->menuBundleModel->id;
			}

			// add ordered articles
			foreach ($orderedItemInput['orderedArticlesCollection'] as $index => $orderedArticleInput) {
				// check first ordered article for menu upgrade
				if ($index == 0 and $orderedArticleInput['menuUpgradeModel']) {
					$orderedItemModel->menu_upgrade_model_id = $orderedArticleInput['menuUpgradeModel']['id'];
				}

				$orderedArticleModel = $this->createOrderedArticleModel($orderedArticleInput);
				$orderedItemModel->orderedArticlesCollection->add($orderedArticleModel);
			}

			$orderedItemsCollection->add($orderedItemModel);
		}

		return $orderedItemsCollection;
	}


	private function createOrderedArticleModel($orderedArticleInput)
	{
		$orderedArticleModel = new OrderedArticleModel();

		$orderedArticleModel->article_model_id = $orderedArticleInput['articleModel']['id'];

		$articleModel = $orderedArticleModel->articleModel;
			$ingredientCategoriesCollectionInput = $orderedArticleInput['articleModel']['ingredientCategoriesCollection'];

		if ($articleModel->allowsIngredients and $ingredientCategoriesCollectionInput) {

			// pick out selected ingredients and add to ingredients collection
			foreach ($ingredientCategoriesCollectionInput as $ingredientCategoryInput) {
				foreach ($ingredientCategoryInput['ingredientsCollection'] as $ingredientInput) {
					if ($ingredientInput['isSelected']) {
						$ingredientModel = IngredientModel::find($ingredientInput['id']);
						$orderedArticleModel->ingredientsCollection->add($ingredientModel);
					}
				}
			}

		}

		return $orderedArticleModel;

	}


	private function createTempAddressModel($addressInput)
	{
		$addressModel = new AddressModel(array(
			'firstName'			=> $addressInput['firstName'],
			'lastName'			=> $addressInput['lastName'],
			'street'			=> $addressInput['street'],
			'streetAdditional'	=> $addressInput['streetAdditional'],
			'postal'			=> $addressInput['postal'],
			'city'				=> $addressInput['city'],
			'email'				=> $addressInput['email'],
			'phone'				=> $addressInput['phone'],
			));

		$this->orderModel->setRelation('addressModel', $addressModel);
	}


	private function saveTempRelations()
	{
		foreach ($this->orderModel->orderedItemsCollection as $orderedItemModel) {
			$this->orderModel->orderedItemsCollection()->save($orderedItemModel);

			foreach ($orderedItemModel->orderedArticlesCollection as $orderedArticleModel) {
				$orderedItemModel->orderedArticlesCollection()->save($orderedArticleModel);

				foreach ($orderedArticleModel->ingredientsCollection as $ingredientModel) {
					$orderedArticleModel->ingredientsCollection()->attach($ingredientModel->id);
				}
			}
		}

		$this->orderModel->addressModel->save();
	}


}