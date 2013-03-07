<?php namespace App\Models;

/**
 * Delivery area class
 *
 * Stores a delivery area
 */
class DeliveryAreaModel extends BaseModel
{
	public $timestamps = false;

	protected $table = 'delivery_area_models';

	protected $hidden = array('store_model_id');

	/**
	 * Returns the store
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('App\\Models\\StoreModel');
	}

	public function matchesCompoundCity($compoundCity)
	{

		$text = 'ignore everything except this (text)';
		$city = $compoundCity;
		$district = '';

		// extract district and city
		preg_match('#\((.*?)\)#', $compoundCity, $splittedCity);
		if (count($splittedCity) == 2) {
			$district = $splittedCity[1];

			$lengthOfDistrict = strlen($district) + 3; // 3 extra for space and brackets
			$city = substr($compoundCity, 0, -($lengthOfDistrict));
		}

		return $city == $this->city && $district == $this->district;
	}


}