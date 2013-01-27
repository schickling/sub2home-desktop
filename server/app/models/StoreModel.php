<?php

/**
 * Store class
 *
 * Each store is assigned to one or multiple clients.
 */
class StoreModel extends BaseModel
{
	public $hidden = array('paypalToken', 'paypalTokensecret', 'totalTurnover', 'created_at', 'updated_at', 'isActive', 'orderEmail', 'user_model_id', 'id');

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
	{
		$exists = $this->exists;
		$ret = parent::save();

		// Inital save new store
		if (!$exists) {

			// Create custom articlesCollection
			$articlesCollection = ArticleModel::all();
			foreach ($articlesCollection as $articleModel) {
				$customArticleModel = new CustomArticleModel(array(
					'store_model_id' => $this->id,
					'isActive' => true, // MOCK
					'article_model_id' => $articleModel->id,
					'price' => $articleModel->price
					));
				$customArticle->save();
			}

			// Create custom menu bundles
			$menuBundlesCollection = MenuBundleModel::all();
			foreach ($menuBundlesCollection as $menuBundleModel) {
				$customMenuModel = new CustomMenuModel(array(
					'store_model_id' => $this->id,
					'isActive' => true, // MOCK
					'menu_bundle_model_id' => $menuBundleModel->id,
					'price' => $menuBundleModel->price
					));
				$customMenuModel->save();
			}

			// Create custom menu upgrades
			$menuUpgradesCollection = MenuUpgradeModel::all();
			foreach ($menuUpgradesCollection as $menu_upgrade) {
				$customMenuModel = new CustomMenuModel(array(
					'store_model_id' => $this->id,
					'isActive' => true, // MOCK
					'menu_upgrade_model_id' => $menu_upgrade->id,
					'price' => $menu_upgrade->price
					));
				$customMenuModel->save();
			}

			// Create custom ingredientsCollection
			$ingredientsCollection = IngredientModel::all();
			foreach ($ingredientsCollection as $ingredientModel) {
				$customIngredientModel = new CustomIngredientModel(array(
					'store_model_id' => $this->id,
					'isActive' => true, // MOCK
					'ingredient_model_id' => $ingredientModel->id,
					'price' => $ingredientModel->price
					));
				$customIngredientModel->save();
			}

			// Copy address of owner
			$addressModel = new AddressModel(array(
				'firstName' => $this->userModel->addressModel->firstName,
				'lastName' => $this->userModel->addressModel->lastName,
				'street' => $this->userModel->addressModel->street,
				'streetAdditional' => $this->userModel->addressModel->streetAdditional,
				'postal' => $this->userModel->addressModel->postal,
				'city' => $this->userModel->addressModel->city,
				'phone' => $this->userModel->addressModel->phone,
				'email' => $this->userModel->addressModel->email
				));
			$this->addressModel()->save($addressModel);

			// Create default delivery times
			for ($dayOfWeek = 0; $dayOfWeek < 7; $dayOfWeek++) {
				$noon = new DeliveryTimeModel(array(
					'store_model_id' => $this->id,
					'dayOfWeek' => $dayOfWeek,
					'startMinutes' => 690, // 11:30
					'end_minutes' => 840 // 14:00
					));
				$noon->save();

				$evening = new DeliveryTimeModel(array(
					'store_model_id' => $this->id,
					'dayOfWeek' => $dayOfWeek,
					'startMinutes' => 1020, // 17:00
					'end_minutes' => 1320 // 22:00
					));
				$evening->save();
			}

			// Create default delivery area
			$deliveryAreaModel = new DeliveryAreaModel(array(
				'store_model_id' => $this->id,
				'postal' => $this->userModel->addressModel->postal,
				'minimumValue' => 5.00,
				'minimumDuration' => 20,
				'description' => $this->addressModel->city
				));
			$deliveryAreaModel->save();
		}

		return $ret;
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
	public function userModel()
	{
		$userModel = $this->belongsTo('UserModel');

		if ($userModel->first()->isClient()) {
			return $userModel;
		}
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
	public function getIsDelivering()
	{
		foreach ($this->deliveryTimesCollection as $deliveryTimeModel) {
			if ($deliveryTimeModel->check()) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Creates an OAuth HTTP header
	 * 
	 * @return string
	 */
	public function getAuthHeader()
	{
		$paypalController = IoC::resolve('paymentPaypal');

		return $paypalController->authHeader($this->id);
	}

	/**
	 * Returns when the store has isOpened next time
	 * 
	 * @return string
	 */
	public function getNextTimeOpened()
	{
		$currentDay = date('w');
		$currentMinutes = (int) date('G') * 60 + (int) date('i');

		$times = $this->deliveryTimesCollection()->order_by('startMinutes', 'asc')->get();

		// Check today
		foreach ($times as $time) {
			if ($time->dayOfWeek == $currentDay && $time->startMinutes > $currentMinutes) {
				return minutesToTime($time->startMinutes);
			}
		}

		// Check other days
		for ($i = 1 ; $i < 7; $i++) { 
			$dayOfWeek = ($currentDay + $i) % 7;
			foreach ($times as $time) {
				if ($time->dayOfWeek == $dayOfWeek) {
					return dayOfWeek($time->dayOfWeek) . ', ' . minutesToTime($time->startMinutes);
				}
			}
		}
	}

	public function getMonthlyTurnover()
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

	public function getTotalOrders()
	{
		return $this->ordersCollection()->count();
	}

	public function getMonthlyOrders()
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
	public function setTitle($title) {
		$this->attributes['title'] = $title;

		// Parse and set alias
		$alias = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $title);
		$alias = strtolower(trim($alias, '-'));
		$alias = preg_replace("/[\/_|+ -]+/", '-', $alias);
		$this->attributes['alias'] = $alias;
	}

}