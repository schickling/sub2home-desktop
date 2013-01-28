<?php

class UserModel extends BaseModel {

	protected $hidden = array('password');

	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		if ($this->isClient()) {
			// Delete his storesCollection 
			foreach ($this->storesCollection as $storeModel) {
				$storeModel->delete();
			}
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
		if ($this->isClient()) {
			return $this->hasMany('StoreModel');
		}
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
	 * Returns whether the user is a client or an admin
	 * 
	 * @return boolean
	 */
	public function isClient()
	{
		return ($this->role == 'client' || $this->role == 'admin');
	}

	/**
	 * Sets role
	 * 
	 * @param string $role
	 */
	public function setRole($role)
	{
		$validRoles = array('admin', 'client');

		if (in_array($role, $validRoles)) {
			$this->attributes['role'] = $role;
		}
	}

	/**
	 * Returns the email address
	 * 
	 * @return string
	 */
	public function getEmail()
	{
		return $this->addressModel->email;
	}

	public function getTotalTurnover()
	{
		if ($this->isClient()) {
			$turnover = 0;

			foreach ($this->storesCollection as $storeModel) {
				$turnover += $storeModel->totalTurnover;
			}
			
			return $turnover;
		}	
	}

	public function getMonthlyTurnover()
	{
		if ($this->isClient()) {
			$turnover = 0;

			foreach ($this->storesCollection as $storeModel) {
				$turnover += $storeModel->monthlyTurnover;
			}
			
			return $turnover;
		}
	}

	public function getTotalOrders()
	{
		if ($this->isClient()) {
			$orders = 0;

			foreach ($this->storesCollection as $storeModel) {
				$orders += $storeModel->totalOrders;
			}

			return $orders;
		}
	}

	public function getMonthlyOrders()
	{
		if ($this->isClient()) {
			$orders = 0;

			foreach ($this->storesCollection as $storeModel) {
				$orders += $storeModel->monthlyOrders;
			}

			return $orders;
		}
	}


}