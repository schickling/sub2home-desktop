<?php namespace App\Models;

use Eloquent;
use App\Exceptions\ModelException;
use DateTime;

class BaseModel extends Eloquent
{

	public static $snakeAttributes = false;

	/**
	 * Unset an attribute on the model.
	 *
	 * @param  string  $key
	 * @return void
	 */
	final public function __unset($key)
	{
		unset($this->attributes[$key]);
		unset($this->relations[$key]);
	}

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	final public function save()
	{
		$modelExists = $this->exists;

		if (!$modelExists) {
			$this->beforeFirstSave();
		}

		$save = parent::save();

		if (!$modelExists) {
			$this->afterFirstSave();
		}

		return $save;
	}

	protected function beforeFirstSave() {}

	protected function afterFirstSave() {}

	final public function getDateTimeFor($attribute)
	{
		$time = $this->{$attribute};

		if ($time instanceof DateTime) {
			return $time;
		} else {
			return new DateTime($time);
		}
	}

	final protected function throwException($reason = '')
	{
		throw new ModelException($reason);
	}

	final public function unhideAttribute($attribute)
	{
		if (($key = array_search($attribute, $this->hidden)) !== false) {
			unset($this->hidden[$key]);
		}
	}


}