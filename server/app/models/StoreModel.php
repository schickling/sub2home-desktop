<?php namespace App\Models;

use DateTime;
use Str;

class StoreModel extends BaseModel
{
	protected $hidden = array(
		'paymentPaypalAuthHeader',
		'number',
		'created_at',
		'updated_at',
		'isActive',
		'orderEmail',
		'client_model_id',
		'commissionRate',
		'id'
		);

	protected $fillable = array(
		'title',
		'commissionRate',
		'number',
		'latitude',
		'longitude',
		'isActive',
		'isOpen',
		'orderEmail',
		'allowsPaymentCash',
		'allowsPaymentEc'
		);

	protected $table = 'store_models';

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function afterFirstSave()
	{

		// Copy address of owner
		$copiedAddressModel = new AddressModel(array(
			'firstName' => $this->clientModel->addressModel->firstName,
			'lastName' => $this->clientModel->addressModel->lastName,
			'street' => $this->clientModel->addressModel->street,
			'streetAdditional' => $this->clientModel->addressModel->streetAdditional,
			'postal' => $this->clientModel->addressModel->postal,
			'city' => $this->clientModel->addressModel->city,
			'phone' => $this->clientModel->addressModel->phone,
			'email' => $this->clientModel->addressModel->email
			));

		$this->addressModel()->save($copiedAddressModel);

		// Create default delivery times
		for ($dayOfWeek = 0; $dayOfWeek < 7; $dayOfWeek++) {
			$noon = new DeliveryTimeModel(array(
				'dayOfWeek' => $dayOfWeek,
				'startMinutes' => 690, // 11:30
				'endMinutes' => 840 // 14:00
				));
			$this->deliveryTimesCollection()->save($noon);

			$evening = new DeliveryTimeModel(array(
				'dayOfWeek' => $dayOfWeek,
				'startMinutes' => 1020, // 17:00
				'endMinutes' => 1320 // 22:00
				));
			$this->deliveryTimesCollection()->save($evening);
		}

		// Create default delivery area
		$deliveryAreaModel = new DeliveryAreaModel(array(
			'postal'			=> $this->clientModel->addressModel->postal,
			'minimumValue'		=> 5.00,
			'minimumDuration'	=> 20,
			'city'				=> $this->addressModel->city,
			'district'			=> 'Innenstadt'
			));
		$this->deliveryAreasCollection()->save($deliveryAreaModel);

		// initalize invoices
		$this->checkInvoices();

		// make at least one article active
		$firstArticleModel = ArticleModel::where('isPublished', true)->first();

		if ($firstArticleModel == null) {
			$this->throwException('No article found');
		}

		$customArticleModel = $firstArticleModel->returnCustomModel($this->id);
		$customArticleModel->isActive = true;
		$customArticleModel->save();
		
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

		// Keep ordersCollection for total system turnover
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

		// Delete belonging invoices
		foreach ($this->invoicesCollection as $invoiceModel) {
			$invoiceModel->delete();
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
		return $this->belongsTo('App\\Models\\ClientModel');
	}

	/**
	 * Returns the custom articlesCollection of the store
	 * 
	 * @return object
	 */
	public function customArticlesCollection()
	{
		return $this->hasMany('App\\Models\\CustomArticleModel');
	}

	/**
	 * Returns the address of the store
	 * 
	 * @return object
	 */
	public function addressModel()
	{
		return $this->morphOne('App\\Models\\AddressModel', 'ownerModel');
	}

	/**
	 * Returns the custom ingredientsCollection of the store
	 * 
	 * @return object
	 */
	public function customIngredientsCollection()
	{
		return $this->hasMany('App\\Models\\CustomIngredientModel');
	}

	/**
	 * Returns the custom menus of the store
	 * 
	 * @return object
	 */
	public function customMenusCollection()
	{
		return $this->hasMany('App\\Models\\CustomMenuModel');
	}

	/**
	 * Returns the invoices of a store
	 * 
	 * @return object
	 */
	public function invoicesCollection()
	{
		return $this->hasMany('App\\Models\\InvoiceModel');
	}

	/**
	 * Returns the ordersCollection
	 * 
	 * @return object
	 */
	public function ordersCollection()
	{
		return $this->hasMany('App\\Models\\OrderModel');
	}

	/**
	 * Returns the delivery times
	 * 
	 * @return object
	 */
	public function deliveryTimesCollection()
	{
		return $this->hasMany('App\\Models\\DeliveryTimeModel');
	}

	/**
	 * Returns the delivery areas
	 * 
	 * @return object
	 */
	public function deliveryAreasCollection()
	{
		return $this->hasMany('App\\Models\\DeliveryAreaModel');
	}

	/**
	 * Sets the title and the alias
	 * 
	 * @param string $title
	 */
	public function setTitleAttribute($title) {
		$this->attributes['title'] = $title;
		$this->attributes['alias'] = Str::slug($title);
	}

	public function setNumberAttribute($number)
	{
		if ($this->number != 0) {
			$this->throwException('Store number may not be changed');
		}

		if ($number < 1000 || $number > 9999) {
			$this->throwException('No valid store number');
		}

		$this->attributes['number'] = $number;
	}


	public function checkInvoices()
	{
		$invoicesCollection = $this->invoicesCollection;

		// count months since store was created
		$now = new DateTime();
		$currentTotalNumberOfMonths = getTotalNumberOfMonthsFromDateTime($now);
		$dateTimeStoreWasCreated = $this->getDateTimeFor('created_at');
		$totalNumberOfMonthsSinceStoreCreation = getTotalNumberOfMonthsFromDateTime($dateTimeStoreWasCreated);
		$expectedNumberOfInvoices = $currentTotalNumberOfMonths - $totalNumberOfMonthsSinceStoreCreation + 1; // current month counts also

		// check if enough invoices are created and create missing invoices
		if ($invoicesCollection->count() < $expectedNumberOfInvoices) {

			// count months up until now is reached
			for ($tempTotalNumberOfMonths = $totalNumberOfMonthsSinceStoreCreation; $tempTotalNumberOfMonths <= $currentTotalNumberOfMonths; $tempTotalNumberOfMonths++) { 
				
				$invoiceForMonthFound = false;

				// look up all invoices
				foreach ($invoicesCollection as $invoiceModel) {
					if ($invoiceModel->timeSpan == $tempTotalNumberOfMonths) {
						$invoiceForMonthFound = true;
						break;
					}
				}

				// create new invoice if none was found
				if (!$invoiceForMonthFound) {
					$invoiceModel = new InvoiceModel();
					$invoiceModel->timeSpan = $tempTotalNumberOfMonths;
					$invoiceModel->store_model_id = $this->id;
					$invoiceModel->save();
				}

			}

		}

	}

}