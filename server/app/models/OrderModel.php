<?php namespace App\Models;

use Queue;

/**
 * Order class
 *
 * An order consists of one or multiple items.
 */
class OrderModel extends BaseModel
{

	protected $hidden = array('store_model_id', 'updated_at');

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

	/**
	 * Confirms the order
	 * 
	 * @return void
	 */
	public function confirm()
	{
		// 
		Queue::push('App\\Controllers\\Jobs\\CalculateTurnoverForStore', array('orderModel' => $this));

		// Do other stuff with the order like payment stuff
	}
}