<?php

class BaseModel extends Eloquent
{


	/**
	 * Unset an attribute on the model.
	 *
	 * @param  string  $key
	 * @return void
	 */
	public function __unset($key)
	{
		unset($this->attributes[$key]);
		unset($this->relations[$key]);
	}

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
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


}