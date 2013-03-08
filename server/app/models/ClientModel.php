<?php namespace App\Models;

use Queue;

class ClientModel extends BaseModel {

	protected $hidden = array('hashedPassword', 'created_at', 'updated_at');

	protected $table = 'client_models';

	public function afterFirstSave()
	{
		// initialize mandatory relationships
		$this->addressModel()->create(array());
		$this->bankaccountModel()->create(array());

		// send client data
		$jobData = array('client_model_id' => $this->id);
		Queue::push('App\\Controllers\\Jobs\\Mail\\SendClientCreatedMailJob', $jobData);
	}

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

		// Delete belonging address
		$this->addressModel->delete();

		// Delete belonging bankaccount
		$this->bankaccountModel->delete();
		
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
	 * Returns the bankaccount
	 * 
	 * @return object
	 */
	public function bankaccountModel()
	{
		return $this->hasOne('App\\Models\\BankaccountModel');
	}


}