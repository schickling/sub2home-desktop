<?php namespace App\Models;

class ClientModel extends BaseModel {

	protected $hidden = array('password', 'created_at', 'updated_at');

	protected $table = 'client_models';

	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Delete his storesCollection 
		foreach ($this->storesCollection as $storeModel) {
			$storeModel->delete();
		}
		
		return parent::delete();
	}

	/**
	 * Returns the storesCollection beloning to the client
	 * 
	 * @return object
	 */
	public function storesCollection()
	{
		return $this->hasMany('App\\Models\\StoreModel');
	}

	/**
	 * Returns the address
	 * 
	 * @return object
	 */
	public function addressModel()
	{
		return $this->morphOne('App\\Models\\AddressModel', 'ownerModel');
	}

	/**
	 * Returns the email address
	 * 
	 * @return string
	 */
	public function getEmailAttribute()
	{
		return $this->addressModel->email;
	}

	public function getTotalTurnoverAttribute()
	{
		$turnover = 0;

		foreach ($this->storesCollection as $storeModel) {
			$turnover += $storeModel->totalTurnover;
		}
		
		return $turnover;

	}

	public function getMonthlyTurnoverAttribute()
	{
		$turnover = 0;

		foreach ($this->storesCollection as $storeModel) {
			$turnover += $storeModel->monthlyTurnover;
		}
		
		return $turnover;
	}

	public function getTotalOrdersAttribute()
	{
		$orders = 0;

		foreach ($this->storesCollection as $storeModel) {
			$orders += $storeModel->totalOrders;
		}

		return $orders;
	}

	public function getMonthlyOrdersAttribute()
	{
		$orders = 0;

		foreach ($this->storesCollection as $storeModel) {
			$orders += $storeModel->monthlyOrders;
		}

		return $orders;
	}


}