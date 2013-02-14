<?php namespace App\Models;

/**
 * Delivery time class
 *
 * Stores a delivery time
 */
class DeliveryTimeModel extends BaseModel
{
	public $timestamps = false;

	protected $table = 'delivery_time_models';

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

	public function setDayOfWeekAttribute($dayOfWeek)
	{
		if ($dayOfWeek < 0 || $dayOfWeek > 6) {
			throw new Exception("No valid week day");
		}
		$this->attributes['dayOfWeek'] = $dayOfWeek;
	}

	public function setStartMinutesAttribute($startMinutes)
	{
		if ($startMinutes < 0 || $startMinutes >= 24 * 60) {
			throw new Exception("No valid day time");
		}
		$this->attributes['startMinutes'] = $startMinutes;
	}

	public function setEndMinutesAttribute($endMinutes)
	{
		if ($endMinutes < 0 || $endMinutes >= 24 * 60) {
			throw new Exception("No valid day time");
		}
		$this->attributes['endMinutes'] = $endMinutes;
	}

	/**
	 * Returns whether this delivery time matches current time
	 * 
	 * @return boolean
	 */
	public function check()
	{
		$dayOfWeek = date('N');
		$minutes = date('G') * 60 + (int)date('i');
		
		if ($dayOfWeek != $this->dayOfWeek ||
			$minutes < $this->startMinutes ||
			$minutes > $this->endMinutes) {
			return false;
		} else {
			return true;
		}
	}
}