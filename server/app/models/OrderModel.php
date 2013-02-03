<?php

/**
 * Order class
 *
 * An order consists of one or multiple items.
 */
class OrderModel extends BaseModel
{
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
		
	}

	/**
	 * Confirms the order
	 * 
	 * @return void
	 */
	public function confirm()
	{
		$this->calculateTotal();

		// Do other stuff with the order like payment stuff
	}
}