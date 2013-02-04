<?php

/**
 * Order class
 *
 * An order consists of one or multiple items.
 */
class OrderModel extends BaseModel
{

	protected $hidden = array('store_model_id', 'updated_at');

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
		return $this->hasMany('OrderedItemModel');
	}

	/**
	 * Returns the store the order was made
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('StoreModel');
	}

	/**
	 * Returns the address of the customer
	 * 
	 * @return object
	 */
	public function addressModel()
	{
		return $this->hasOne('AddressModel');
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
		// Do other stuff with the order like payment stuff
	}
}