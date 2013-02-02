<?php

class ClientModel extends BaseModel {

	protected $hidden = array('password');

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
		return $this->hasMany('StoreModel');
	}

	/**
	 * Returns the address
	 * 
	 * @return object
	 */
	public function addressModel()
	{
		return $this->hasOne('AddressModel');
	}

	/**
	 * Returns the email address
	 * 
	 * @return string
	 */
	public function giveEmail()
	{
		return $this->addressModel->email;
	}

	public function giveTotalTurnover()
	{
		$turnover = 0;

		foreach ($this->storesCollection as $storeModel) {
			$turnover += $storeModel->totalTurnover;
		}
		
		return $turnover;

	}

	public function giveMonthlyTurnover()
	{
		$turnover = 0;

		foreach ($this->storesCollection as $storeModel) {
			$turnover += $storeModel->monthlyTurnover;
		}
		
		return $turnover;
	}

	public function giveTotalOrders()
	{
		$orders = 0;

		foreach ($this->storesCollection as $storeModel) {
			$orders += $storeModel->totalOrders;
		}

		return $orders;
	}

	public function giveMonthlyOrders()
	{
		$orders = 0;

		foreach ($this->storesCollection as $storeModel) {
			$orders += $storeModel->monthlyOrders;
		}

		return $orders;
	}


}