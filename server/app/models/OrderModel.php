<?php namespace App\Models;

use Queue;
use Request;

/**
 * Order class
 *
 * An order consists of one or multiple items.
 */
class OrderModel extends BaseModel
{

	protected $hidden = array('store_model_id', 'updated_at', 'commissionRate');

	protected $fillable = array(
		'isDelivered',
		'credit',
		'commissionRate',
		'comment',
		'ip',
		'subcardCode',
		'couponCode',
		'due_at'
		);

	protected $table = 'order_models';

	protected function beforeFirstSave()
	{
		// TODO check
		$requestIp = Request::getClientIp();
		$ip = (is_null($requestIp)) ? '127.0.0.1' : $requestIp;
		$this->ip = $ip;
	}

	public function delete()
	{
		$this->throwException('Can not delete an order');
	}

	/**
	 * Returns the ordered items of the order
	 * 
	 * @return object
	 */
	public function orderedItemsCollection()
	{
		return $this->hasMany('App\\Models\\OrderedItemModel');
	}

	/**
	 * Returns the store the order was made
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}

	/**
	 * Returns the balance order model (if exists)
	 * 
	 * @return object
	 */
	public function balanceOrderModel()
	{
		return $this->hasOne('App\\Models\\OrderModel');
	}

	/**
	 * Returns the invoice the order will belong to
	 * 
	 * @return object
	 */
	public function invoiceModel()
	{
		return $this->belongsTo('App\\Models\\InvoiceModel');
	}

	/**
	 * Returns the address of the customer
	 * 
	 * @return object
	 */
	public function addressModel()
	{
		return $this->morphOne('App\\Models\\AddressModel', 'ownerModel');
	}

	public function setTotalAttribute()
	{
		$this->throwException('Total has to be calculated');
	}

	public function setBalance($total)
	{
		if ($this->isBalance()) {
			$this->attributes['total'] = $total;
		}
	}

	public function calculateTotal()
	{
		$total = 0;

		foreach ($this->orderedItemsCollection as $orderedItemModel) {
			$orderedItemModel->calculateTotal($this->storeModel->id);
			$total += $orderedItemModel->total;
		}

		$this->attributes['total'] = $total;
	}

	/**
	 * Validates the order. Order and relations usually arent't saved yet but needed
	 * 
	 * @return boolean
	 */
	public function isValid()
	{
		if ($this->isBalance()) {
			return true;
		}

		$isValid = true;

		$isValid = $isValid and $this->verifyStore();
		$isValid = $isValid and $this->verifyMinimumValue();
		$isValid = $isValid and $this->verifyCredit();
		$isValid = $isValid and $this->verifyMenus();
		$isValid = $isValid and $this->verifyOrderedArticles();
		$isValid = $isValid and $this->verifyDueDate();

		return $isValid;
	}

	/**
	 * Confirms the order
	 * 
	 * @return void
	 */
	public function confirm()
	{
		if (!$this->isValid() or $this->isBalance()) {
			$this->throwException();
		}

		$jobData = array('order_model_id' => $this->id);

		Queue::push('App\\Controllers\\Jobs\\ProcessNewOrderJob', $jobData);
		Queue::push('App\\Controllers\\Jobs\\Mail\\SendCustomerOrderConfirmMailJob', $jobData);
		Queue::push('App\\Controllers\\Jobs\\Mail\\SendStoreOrderNotificationMailJob', $jobData);

	}

	private function verifyStore()
	{
		$storeModel = $this->storeModel;
		return $storeModel->isActive and $storeModel->isOpen;
	}

	private function verifyMinimumValue()
	{
		$addressModel = $this->addressModel;
		$postal = $addressModel->postal;
		$compoundCity = $addressModel->city;

		$storeModel = $this->storeModel;
		$deliveryAreasCollectionWithSamePostal = $storeModel->deliveryAreasCollection()->where('postal', $postal)->get();
		$matchingDeliveryAreaModel = null;

		foreach ($deliveryAreasCollectionWithSamePostal as $deliveryAreaModel) {
			if ($deliveryAreaModel->matchesCompoundCity($compoundCity)) {
				$matchingDeliveryAreaModel = $deliveryAreaModel;
				break;
			}
		}

		if ($matchingDeliveryAreaModel == null) {
			// delivery area doesn't exist
			return false;
		}

		return $this->total >= $matchingDeliveryAreaModel->minimumValue;
	}

	private function verifyCredit()
	{
		return $this->credit >= 0;
	}

	private function verifyMenus()
	{
		$store_model_id = $this->storeModel->id;

		foreach ($this->orderedItemsCollection as $orderedItemModel) {
			$menuModel = $orderedItemModel->menuModel;

			if ($menuModel and !$menuModel->isActive($store_model_id)) {
				return false;
			}
		}

		return true;
	}

	private function verifyOrderedArticles()
	{
		$store_model_id = $this->storeModel->id;

		foreach ($this->orderedItemsCollection as $orderedItemModel) {
			foreach ($orderedItemModel->orderedArticlesCollection as $orderedArticleModel) {
				
				// check if article is active in current store
				$articleModel = $orderedArticleModel->articleModel;
				if (!$articleModel->isActive($store_model_id)) {
					return false;
				}

				// check if article has ingredients even if none allowed
				$ingredientsCollection = $orderedArticleModel->ingredientsCollection;
				if (!$articleModel->allowsIngredients and $ingredientsCollection->count() > 0) {
					return false;
				}

			}
		}

		return true;
	}

	private function verifyDueDate()
	{
		// check if is due in future
		$isInFuture = ($this->due_at >= $this->created_at);

		// check delivery times
		$deliveryTimesCollection = $this->storeModel->deliveryTimesCollection;
		$matchesDeliveryTimes = false;
		$dateTime = $this->getDateTimeFor('due_at');

		foreach ($deliveryTimesCollection as $deliveryTimeModel) {
			if ($deliveryTimeModel->checkDateTime($dateTime)) {
				$matchesDeliveryTimes = true;
			}
		}

		return $isInFuture and $matchesDeliveryTimes;
	}

	public function isBalance()
	{
		return $this->balanceOrderModel != null;
	}

}