<?php namespace App\Controllers\Api\Frontend\Customer\Orders;

use App\Controllers\Api\Frontend\Customer\ApiController;
use Input;
use Illuminate\Database\Eloquent\Collection;
use DateTime;
use App\Controllers\Services\Payment\PaypalService;

use App\Models\OrderModel;
use App\Models\AddressModel;
use App\Models\IngredientModel;
use App\Models\OrderedArticleModel;
use App\Models\OrderedItemModel;
use App\Models\MenuUpgradeModel;
use App\Models\MenuBundleModel;

/**
* 
*/
class CreateController extends ApiController
{

	private $orderModel;
	private $input;


	/**
	 * @POST('api/frontend/stores/{alias}/orders')
	 */
	public function route()
	{
		$this->input = Input::json();

		$this->validateInput();
		$this->prepareOrderModel();
		$this->checkModelIds();
		$this->prepareRelationships();
		$this->calculateTotal();
		$this->validateTotal();
		$this->setOrderData();
		$this->validateOrder();
		$this->saveOrderModel();
		$this->saveRelationships();
		$this->computePaymentMethod();


		return $this->respondWithStatus(204);
	}


	private function validateInput()
	{
		
	}


	private function prepareOrderModel()
	{
		$this->orderModel = new OrderModel();

		// set store model id (needed for tmp relations)
		$this->orderModel->store_model_id = $this->storeModel->id;
	}


	private function checkModelIds()
	{
		if (!$this->articleModelIdsAreValid() or !$this->menuModelIdsAreValid() or !$this->ingredientModelIdsAreValid()) {
			$this->reportError(400);
		}
	}

	/**
	 * Creates the ordered items collection and address model without saving it to the database
	 */
	private function prepareRelationships()
	{
		// parse ordered items and create temporary relations
		$this->prepareOrderedItemsCollection();

		// create tmp address model
		$this->prepareAddressModel();

	}


	private function calculateTotal()
	{
		$this->orderModel->calculateTotal();
	}


	private function validateTotal()
	{
		// compare totals (relation to store needed for custom prices)
		if ($this->orderModel->total != $this->input['total']) {
			var_dump('total: ' . $this->orderModel->total);
			$this->reportError(400);
		}
	}


	private function setOrderData()
	{
		// set current commision rate
		$this->orderModel->commissionRate = $this->storeModel->commissionRate;

		// set other order data
		$this->orderModel->paymentMethod = $this->input['paymentMethod'];
		$this->orderModel->isDelivered = false;
		$this->orderModel->credit = $this->input['credit'];
		$this->orderModel->comment = $this->input['comment'];

		$this->orderModel->due_at = new DateTime();
		$this->orderModel->due_at->setTimestamp($this->input['due_at'] / 1000);

	}


	private function validateOrder()
	{	
		if (!$this->orderModel->isValid()) {
			$this->reportError(400);
		}
	}


	private function saveOrderModel()
	{
		// save order
		$this->orderModel->save();
	}


	private function saveRelationships()
	{
		$this->saveOrderedItemsCollection();
		$this->saveAddressModel();
	}


	private function computePaymentMethod()
	{
		if ($this->orderModel->paymentMethod == 'paypal') {

			$paypalUrl = PaypalService::getCheckoutUrl($this->orderModel);
			$this->reportError(303, $paypalUrl);

		} else {

			$this->orderModel->confirm();	

		}

	}


	/*
	|--------------------------------------------------------------------------
	| Helper methods
	|--------------------------------------------------------------------------
	*/


	private function articleModelIdsAreValid()
	{
		return true;
	}


	private function menuModelIdsAreValid()
	{
		return true;
	}


	private function ingredientModelIdsAreValid()
	{
		return true;
	}


	
	private function prepareOrderedItemsCollection()
	{
		$orderedItemsInput = $this->input['orderedItemsCollection'];

		// TODO
		$orderedItemsCollection = new Collection();

		foreach ($orderedItemsInput as $orderedItemInput) {
			$orderedItemModel = new OrderedItemModel();
			$orderedItemModel->amount = $orderedItemInput['amount'];

			// set link to order model
			$orderedItemModel->setRelation('orderModel', $this->orderModel);


			// check if is menu bundle
			if ($orderedItemInput['menuBundleModel']) {
				$menuBundleModel = MenuBundleModel::find($orderedItemInput['menuBundleModel']['id']);
				$orderedItemModel->setRelation('menuBundleModel', $menuBundleModel);
				$orderedItemModel->menu_bundle_model_id = $menuBundleModel->id;
			}

			// add ordered articles
			foreach ($orderedItemInput['orderedArticlesCollection'] as $index => $orderedArticleInput) {

				// check first ordered article for menu upgrade
				if ($index == 0 and $orderedArticleInput['menuUpgradeModel']) {
					$menuUpgradeModel = MenuUpgradeModel::find($orderedArticleInput['menuUpgradeModel']['id']);
					$orderedItemModel->setRelation('menuUpgradeModel', $menuUpgradeModel);
					$orderedItemModel->menu_upgrade_model_id = $menuUpgradeModel->id;
				}

				$orderedArticleModel = $this->prepareOrderedArticleModel($orderedArticleInput);
				$orderedItemModel->orderedArticlesCollection->add($orderedArticleModel);
			}

			$orderedItemsCollection->add($orderedItemModel);
		}


		$this->orderModel->setRelation('orderedItemsCollection', $orderedItemsCollection);

	}


	private function prepareOrderedArticleModel($orderedArticleInput)
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


	private function prepareAddressModel()
	{
		$addressInput = $this->input['addressModel'];

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


	private function saveOrderedItemsCollection()
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

	}

	private function saveAddressModel()
	{
		$this->orderModel->addressModel->save();
	}


}