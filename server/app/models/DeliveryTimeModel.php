<?php

/**
 * Delivery time class
 *
 * Stores a delivery time
 */
class DeliveryTimeModel extends BaseModel
{
	public $timestamps = false;

	public $hidden = array('store_model_id');

	/**
	 * Returns the store
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('StoreModel');
	}

	public function set_dayOfWeek($dayOfWeek)
	{
		if ($dayOfWeek < 0 || $dayOfWeek > 6) {
			throw new Exception("No valid week day");
		}
		$this->setAttribute('dayOfWeek', $dayOfWeek);
	}

	public function setStartMinutes($startMinutes)
	{
		if ($startMinutes < 0 || $startMinutes >= 24 * 60) {
			throw new Exception("No valid day time");
		}
		$this->attributes['startMinutes'] = $startMinutes;
	}

	public function setEndMinutes($endMinutes)
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