<?php namespace App\Models;

use Queue;

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

	public function verify()
	{
		// TODO return bool
		$this->verifyMinimumValue();
		$this->verifyDeliveryArea();
		$this->verifyOrderedArticles();
		$this->verifyDueDate();
	}

	/**
	 * Confirms the order
	 * 
	 * @return void
	 */
	public function confirm()
	{
		$jobData = array('order_model_id' => $this->id);

		Queue::push('App\\Controllers\\Jobs\\ProcessNewOrderJob', $jobData);
		Queue::push('App\\Controllers\\Jobs\\Mail\\CustomerOrderConfirmMailJob', $jobData);
		Queue::push('App\\Controllers\\Jobs\\Mail\\StoreOrderNotificationMailJob', $jobData);

	}

	private function verifyMinimumValue()
	{
		
	}

	private function verifyDeliveryArea()
	{
		
	}

	private function verifyOrderedArticles()
	{
		
	}

	private function verifyDueDate()
	{
		
	}

}