<?php

/**
 * Address class
 *
 * StoreModels all relevant address data
 */
class AddressModel extends BaseModel
{
	protected $hidden = array('client_model_id', 'id', 'store_model_id');

	public $timestamps = false;

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
	{
		$exists = $this->exists;
		$save = parent::save();

		// check if address belongs to store
		if ($this->storeModel != null) {
			// check if location specific data has been changed
			if (!$exists || $this->changed('street') || $this->changed('postal') || $this->changed('city')) {
				$this->updateStoreModelCoords();
			}
		}

		return $save;
	}

	public function clientModel()
	{
		return $this->belongsTo('ClientModel');
	}

	public function storeModel()
	{
		return $this->belongsTo('StoreModel');
	}

	/**
	 * Returns either its storeModel or clientModel
	 * 
	 * @return StoreModel | ClientModel
	 */
	public function getOwnerModel()
	{
		if ($this->storeModel != null) {
			return $this->storeModel;
		} elseif ($this->clientModel != null) {
			return $this->clientModel;
		} else {
			throw new Exception("Address has no owner");
		}
	}

	/**
	 * Fetches coordinates matching address from google geocode api and saves to store
	 * 
	 * @return void
	 */
	private function updateStoreModelCoords()
	{
		// Fetch coordinate from google api
		$url = sprintf('http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false', urlencode($this->toString()));

		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$result = curl_exec($ch);

		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);

		if ($httpCode == 200) {
			$geocode = json_decode($result);
			$this->storeModel->latitude = $geocode->results[0]->geometry->location->lat;
			$this->storeModel->longitude = $geocode->results[0]->geometry->location->lng;
			$this->storeModel->save();
		}
	
	}

	public function toString()
	{
		return sprintf('%s, %i %s', $this->street, $this->postal, $this->city);
	}
}