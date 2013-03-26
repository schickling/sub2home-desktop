<?php namespace App\Models;

class ClientModel extends BaseModel {

	protected $hidden = array('hashedPassword', 'created_at', 'updated_at');

	protected $fillable = array('hashedPassword', 'number');

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

	public function setNumberAttribute($number)
	{
		if ($this->number != 0) {
			$this->throwException('Client number may not be changed');
		}

		if ($number < 1000 || $number > 9999) {
			$this->throwException('No valid client number');
		}

		$this->attributes['number'] = $number;
	}

}