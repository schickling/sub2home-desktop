<?php namespace App\Models;

/**
 * Address class
 *
 * StoreModels all relevant address data
 */
class AddressModel extends BaseModel
{
	protected $hidden = array('ownerModel_id', 'ownerModel_type');

	protected $fillable = array('firstName', 'lastName', 'street', 'streetAdditional', 'postal', 'city', 'email', 'phone');

	public $timestamps = false;

	protected $table = 'address_models';

	protected function afterFirstSave()
	{
		if ($this->belongsToStoreModel()) {
			$this->updateStoreModelCoords();
		}
	}

	public function ownerModel()
	{
		return $this->morphTo('ownerModel');
	}

	private function belongsToStoreModel()
	{
		// check for isset because it gets even called if the model wasn't saved yet
		return array_key_exists('ownerModel', $this->relations) and $this->ownerModel instanceof StoreModel;
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
				$storeModel = $this->ownerModel;
				$storeModel->latitude = $geocode->results[0]->geometry->location->lat;
				$storeModel->longitude = $geocode->results[0]->geometry->location->lng;
				$storeModel->save();
			}
		}

	}

	public function setStreetAttribute($street)
	{
		$this->attributes['street'] = $street;

		if ($this->belongsToStoreModel()) {
			$this->updateStoreModelCoords();
		}
	}

	public function setPostalAttribute($postal)
	{
		$this->attributes['postal'] = $postal;

		if ($this->belongsToStoreModel()) {
			$this->updateStoreModelCoords();
		}
	}

	public function setCityAttribute($city)
	{
		$this->attributes['city'] = $city;

		if ($this->belongsToStoreModel()) {
			$this->updateStoreModelCoords();
		}
	}

	public function toString()
	{
		return sprintf('%s, %i %s', $this->street, $this->postal, $this->city);
	}
}