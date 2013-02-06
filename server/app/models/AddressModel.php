<?php

/**
 * Address class
 *
 * StoreModels all relevant address data
 */
class AddressModel extends BaseModel
{
	protected $hidden = array('client_model_id', 'store_model_id', 'order_model_id');

	public $timestamps = false;

	protected function afterFirstSave()
	{
		// TODO: replace and issue
		if ($this->storeModel()->first() != null) {
			$this->updateStoreModelCoords();
		}
	}

	public function clientModel()
	{
		return $this->belongsTo('ClientModel');
	}

	public function storeModel()
	{
		return $this->belongsTo('StoreModel');
	}

	public function orderModel()
	{
		return $this->belongsTo('OrderModel');
	}

	/**
	 * Returns either its storeModel or clientModel
	 * 
	 * @return StoreModel | ClientModel
	 */
	public function giveOwnerModel()
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

			if ($geocode->status == 'OK') {
				$storeModel = $this->storeModel()->first();
				$storeModel->latitude = $geocode->results[0]->geometry->location->lat;
				$storeModel->longitude = $geocode->results[0]->geometry->location->lng;
				$storeModel->save();
			}
		}

	}

	public function takeStreet($street)
	{
		$this->attributes['street'] = $street;

		if ($this->storeModel != null) {
			$this->updateStoreModelCoords();
		}
	}

	public function takePostal($postal)
	{
		$this->attributes['postal'] = $postal;

		if ($this->storeModel != null) {
			$this->updateStoreModelCoords();
		}
	}

	public function takeCity($city)
	{
		$this->attributes['city'] = $city;

		if ($this->storeModel != null) {
			$this->updateStoreModelCoords();
		}
	}

	public function toString()
	{
		return sprintf('%s, %i %s', $this->street, $this->postal, $this->city);
	}
}