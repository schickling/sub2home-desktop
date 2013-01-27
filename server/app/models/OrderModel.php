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
	 * Returns the ordered articles of the order
	 * 
	 * @return object
	 */
	public function orderedArticlesCollection()
	{
		return $this->hasMany('OrderedArticleModel');
	}

	/**
	 * Returns the ordered menus of the order
	 * 
	 * @return object
	 */
	public function orderedMenusCollection()
	{
		return $this->hasMany('OrderedMenuModel');
	}

	/**
	 * Returns all ordered articles of the order including articles of the menus
	 * 
	 * @return object
	 */
	public function getCompleteOrderedArticlesCollection()
	{
		$orderedMenusCollection = $this->orderedMenusCollection;

		$completeOrderedArticlesCollection = array();

		// Add items from menus
		foreach ($orderedMenusCollection as $orderedMenuModel) {
			foreach ($orderedMenuModel->orderedArticlesCollection as $orderedArticleModel) {
				array_push($completeOrderedArticlesCollection, $orderedArticleModel);
			}
		}

		// Add isSingle items
		foreach ($this->orderedArticlesCollection as $orderedArticleModel) {
			array_push($completeOrderedArticlesCollection, $orderedArticleModel);
		}

		return $completeOrderedArticlesCollection;
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
	 * Set payment controller
	 *
	 * @param string $payment
	 * @return void
	 * @throws Exception
	 */
	public function setPayment($payment)
	{
		$validPayments = array('cash', 'ec', 'paypal', 'credit');

		if (in_array($payment, $validPayments)) {
			$this->attributes['payment'] = $payment;
		} else {
			throw new Exception("No valid payment");
		}
	}

	private function calculateTotal()
	{
		$total = 0.00;

		foreach ($this->orderedArticlesCollection as $orderedArticleModel) {
			$total += $orderedArticleModel->total;
		}

		foreach ($this->orderedMenusCollection as $orderedMenuModel) {
			$total += $orderedMenuModel->total;
		}

		$this->total = $total;
		$this->save();
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