<?php namespace App\Models;

use Queue;
use Exception;

/**
 * Order class
 *
 * An order consists of one or multiple items.
 */
class OrderModel extends BaseModel
{

	protected $hidden = array('store_model_id', 'updated_at', 'commissionRate');

	protected $table = 'order_models';

	public function delete()
	{
		throw new Exception("Can not delete an order");
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

	public function calculateTotal()
	{
		$total = 0;

		foreach ($this->orderedItemsCollection as $orderedItemModel) {
			$orderedItemModel->calculateTotal($this->storeModel->id);
			$total += $orderedItemModel->total;
		}

		$this->total = $total;
	}

	/**
	 * Validates the order. Order and relations usually arent't saved yet but needed
	 * 
	 * @return boolean
	 */
	public function isValid()
	{
		$isValid = true;

		$isValid = $isValid && $this->verifyMinimumValue();
		$isValid = $isValid && $this->verifyOrderedArticles();
		$isValid = $isValid && $this->verifyDueDate();

		return $isValid;
	}

	/**
	 * Confirms the order
	 * 
	 * @return void
	 */
	public function confirm()
	{
		if (!$this->isValid()) {
			throw new Exception('No valid order');
		}

		$jobData = array('order_model_id' => $this->id);

		Queue::push('App\\Controllers\\Jobs\\ProcessNewOrderJob', $jobData);
		Queue::push('App\\Controllers\\Jobs\\Mail\\SendCustomerOrderConfirmMailJob', $jobData);
		Queue::push('App\\Controllers\\Jobs\\Mail\\SendStoreOrderNotificationMailJob', $jobData);

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

	private function verifyOrderedArticles()
	{
		
		return true;
	}

	private function verifyDueDate()
	{
		
		return true;
	}

}