<?php namespace App\Models;

use App\Execptions\ModelException;

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
		if ($dayOfWeek < 0 or $dayOfWeek > 6) {
			throw new ModelException("No valid week day");
		}
		$this->attributes['dayOfWeek'] = $dayOfWeek;
	}

	public function setStartMinutesAttribute($startMinutes)
	{
		if ($startMinutes < 0 or $startMinutes >= 24 * 60) {
			throw new ModelException("No valid day time");
		}
		$this->attributes['startMinutes'] = $startMinutes;
	}

	public function setEndMinutesAttribute($endMinutes)
	{
		if ($endMinutes < 0 or $endMinutes >= 24 * 60) {
			throw new ModelException("No valid day time");
		}
		$this->attributes['endMinutes'] = $endMinutes;
	}

	/**
	 * Returns whether this delivery time matches given date time object
	 * 
	 * @param  object $datetime
	 * @return boolean
	 */
	public function checkDateTime($dateTime)
	{

		$dayOfWeek = $dateTime->format('N');
		$minutes = $dateTime->format('G') * 60 + (int) $dateTime->format('i');
		
		if ($dayOfWeek != $this->dayOfWeek or
			$minutes < $this->startMinutes or
			$minutes > $this->endMinutes) {
			return false;
		} else {
			return true;
		}
	}
}