<?php

/**
 * Store class
 *
 * Each store is assigned to one or multiple clients.
 */
class StoreModel extends BaseModel
{
	protected $hidden = array(
		'paypalToken',
		'paypalTokensecret',
		'totalTurnover',
		'number',
		'created_at',
		'updated_at',
		'isActive',
		'orderEmail',
		'client_model_id',
		'id'
		);

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function afterFirstSave()
	{

		// Copy address of owner
		$addressModel = new AddressModel(array(
			'firstName' => $this->clientModel->addressModel->firstName,
			'lastName' => $this->clientModel->addressModel->lastName,
			'street' => $this->clientModel->addressModel->street,
			'streetAdditional' => $this->clientModel->addressModel->streetAdditional,
			'postal' => $this->clientModel->addressModel->postal,
			'city' => $this->clientModel->addressModel->city,
			'phone' => $this->clientModel->addressModel->phone,
			'email' => $this->clientModel->addressModel->email
			));
		$this->addressModel()->save($addressModel);

		// Create default delivery times
		for ($dayOfWeek = 0; $dayOfWeek < 7; $dayOfWeek++) {
			$noon = new DeliveryTimeModel(array(
				'store_model_id' => $this->id,
				'dayOfWeek' => $dayOfWeek,
				'startMinutes' => 690, // 11:30
				'endMinutes' => 840 // 14:00
				));
			$noon->save();

			$evening = new DeliveryTimeModel(array(
				'store_model_id' => $this->id,
				'dayOfWeek' => $dayOfWeek,
				'startMinutes' => 1020, // 17:00
				'endMinutes' => 1320 // 22:00
				));
			$evening->save();
		}

		// Create default delivery area
		$deliveryAreaModel = new DeliveryAreaModel(array(
			'store_model_id' => $this->id,
			'postal' => $this->clientModel->addressModel->postal,
			'minimumValue' => 5.00,
			'minimumDuration' => 20,
			'description' => $this->addressModel->city
			));
		$deliveryAreaModel->save();
		
	}

	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Delete belonging custom articlesCollection
		foreach ($this->customArticlesCollection as $customArticle) {
			$customArticle->delete();
		}

		// Delete belonging custom ingredientsCollection
		foreach ($this->customIngredientsCollection as $custom_ingredient) {
			$custom_ingredient->delete();
		}

		// Delete belonging custom menus
		foreach ($this->customMenusCollection as $customMenuModel) {
			$customMenuModel->delete();
		}

		// Delete belonging address
		$this->addressModel->delete();

		// Delete belonging bankaccount
		$this->bankaccountModel->delete();

		// Keep ordersCollection for turnover
		foreach ($this->ordersCollection as $orderModel) {
			$orderModel->store_model_id = 0;
			$orderModel->save();
		}

		// Delete belonging delivery times
		foreach ($this->deliveryTimesCollection as $deliveryTimeModel) {
			$deliveryTimeModel->delete();
		}

		// Delete belonging delivery areas
		foreach ($this->deliveryAreasCollection as $deliveryAreaModel) {
			$deliveryAreaModel->delete();
		}
		
		return parent::delete();
	}

	/**
	 * Returns the clients of the store
	 * 
	 * @return object
	 */
	public function clientModel()
	{
		return $this->belongsTo('ClientModel');
	}

	/**
	 * Returns the custom articlesCollection of the store
	 * 
	 * @return object
	 */
	public function customArticlesCollection()
	{
		return $this->hasMany('CustomArticleModel');
	}

	/**
	 * Returns the address of the store
	 * 
	 * @return object
	 */
	public function addressModel()
	{
		return $this->hasOne('AddressModel');
	}

	/**
	 * Returns the bankaccount of the store
	 * 
	 * @return object
	 */
	public function bankaccountModel()
	{
		return $this->hasOne('BankaccountModel');
	}

	/**
	 * Returns the custom ingredientsCollection of the store
	 * 
	 * @return object
	 */
	public function customIngredientsCollection()
	{
		return $this->hasMany('CustomIngredientModel');
	}

	/**
	 * Returns the custom menus of the store
	 * 
	 * @return object
	 */
	public function customMenusCollection()
	{
		return $this->hasMany('CustomMenuModel');
	}

	/**
	 * Returns the ordersCollection
	 * 
	 * @return object
	 */
	public function ordersCollection()
	{
		return $this->hasMany('OrderModel');
	}

	/**
	 * Returns the delivery times
	 * 
	 * @return object
	 */
	public function deliveryTimesCollection()
	{
		return $this->hasMany('DeliveryTimeModel');
	}

	/**
	 * Returns the delivery areas
	 * 
	 * @return object
	 */
	public function deliveryAreasCollection()
	{
		return $this->hasMany('DeliveryAreaModel');
	}

	/**
	 * Returns whether the store is delivering at the moment
	 * 
	 * @return boolean
	 */
	public function giveIsDelivering()
	{
		foreach ($this->deliveryTimesCollection as $deliveryTimeModel) {
			if ($deliveryTimeModel->check()) {
				return true;
			}
		}
		return false;
	}

	public function giveMonthlyTurnover()
	{
		$totalTurnover = $this->totalTurnover;

		// inconsitency of laravel
		if (is_object($this->created_at)) {
			$diff = abs($this->created_at->getTimestamp() - time());
		} else {
			$diff = abs(strtotime($this->created_at) - time());
		}
		$years = floor($diff / (365*60*60*24));
		$months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));

		if ($months > 0) {
			$monthyTurnover = $totalTurnover / $months;
		} else {
			$monthyTurnover = $totalTurnover;
		}

		return $monthyTurnover;
	}

	public function giveTotalOrders()
	{
		return $this->ordersCollection()->count();
	}

	public function giveMonthlyOrders()
	{
		$totalOrders = $this->totalOrders;

		// inconsitency of laravel
		if (is_object($this->created_at)) {
			$diff = abs($this->created_at->getTimestamp() - time());
		} else {
			$diff = abs(strtotime($this->created_at) - time());
		}
		$years = floor($diff / (365*60*60*24));
		$months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));

		if ($months > 0) {
			$monthyOrders = $totalOrders / $months;
		} else {
			$monthyOrders = $totalOrders;
		}

		return $monthyOrders;
	}

	/**
	 * Sets the title and the alias
	 * 
	 * @param string $title
	 */
	public function takeTitle($title) {
		$this->attributes['title'] = $title;

		// Parse and set alias
		$alias = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $title);
		$alias = strtolower(trim($alias, '-'));
		$alias = preg_replace("/[\/_|+ -]+/", '-', $alias);
		$this->attributes['alias'] = $alias;
	}

}