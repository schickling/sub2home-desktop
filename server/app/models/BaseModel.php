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
	 * Get the model attributes and relationships in array form.
	 * 
	 * @param  array $fields
	 * @return array
	 */
	// public function toArray(&$fields = null)
	// {

	// 	if ($fields == null || ! is_array($fields)) {
	// 		return parent::toArray();
	// 	} else {
	// 		$this->prepareFields($fields);
	// 	}

	// 	$attributes = array();

	// 	foreach ($fields as $field => &$value) {

	// 		$childFields = (is_array($value)) ? $value : null;

	// 		$element = $this->$field;

	// 		// If the relationship is not a "to-many" relationship, we can just
	// 		// toArray the related model and add it as an attribute to the
	// 		// array of existing regular attributes we gathered.
	// 		if ($element instanceof Model)
	// 		{
	// 			$attributes[$field] = $element->toArray($childFields);
	// 		}

	// 		// If the relationship is a "to-many" relationship we need to spin
	// 		// through each of the related models and add each one with the
	// 		// toArray method, keying them both by name and ID.
	// 		elseif (is_array($element))
	// 		{
	// 			$attributes[$field] = array();

	// 			foreach ($element as $id => $model)
	// 			{
	// 				$attributes[$field][$id] = $model->toArray($childFields);
	// 			}
	// 		}

	// 		// normal attribute (string, number, bool...)
	// 		elseif (!is_null($element))
	// 		{
	// 			$attributes[$field] = $element;
	// 		}
			
	// 	}

	// 	return $attributes;
	// }

	

	// private function prepareFields(&$fields)
	// {
	// 	// flip array elements with numeric key
	// 	foreach ($fields as $key => $value) {
	// 		if (is_numeric($key) && is_string($value)) {
	// 			$fields[$value] = true;
	// 			unset($fields[$key]);
	// 		}
	// 	}
	// }

}