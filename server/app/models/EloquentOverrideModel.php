<?php

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EloquentOverrideModel extends Eloquent
{



	/**
	 * Define an inverse one-to-one or many relationship.
	 *
	 * @param  string  $related
	 * @param  string  $foreignKey
	 * @return Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function belongsTo($related, $foreignKey = null)
	{
		// If no foreign key was supplied, we can use a backtrace to guess the proper
		// foreign key name by using the name of the relationship function, which
		// when combined with an "_id" should conventionally match the columns.
		if (is_null($foreignKey))
		{
			list(, $caller) = debug_backtrace(false);

			$foreignKey = lcfirst($caller['function']).'Id';
		}

		// Once we have the foreign key names, we'll just create a new Eloquent query
		// for the related models and returns the relationship instance which will
		// actually be responsible for retrieving and hydrating every relations.
		$instance = new $related;

		$query = $instance->newQuery();

		return new BelongsTo($query, $this, $foreignKey);
	}

	/**
	 * Define an polymorphic, inverse one-to-one or many relationship.
	 *
	 * @param  string  $name
	 * @return Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function morphTo($name = null)
	{
		// If no name is provided, we will use the backtrace to get the function name
		// since that is most likely the name of the polymorphic interface. We can
		// use that to get both the class and foreign key that will be utilized.
		if (is_null($name))
		{
			list(, $caller) = debug_backtrace(false);

			$name = lcfirst($caller['function']);
		}

		return $this->belongsTo($this->{"{$name}Type"}, "{$name}Id");
	}

	/**
	 * Get the joining table name for a many-to-many relation.
	 *
	 * @param  string  $related
	 * @return string
	 */
	public function joiningTable($related)
	{
		// The joining table name, by convention, is simply the snake cased models
		// sorted alphabetically and concatenated with an underscore, so we can
		// just sort the models and join them together to get the table name.
		$base = class_basename($this);

		$related = class_basename($related);

		$models = array($related, $base);

		// Now that we have the model names in an array we can just sort them and
		// use the implode function to join them together with an underscores,
		// which is typically used by convention within the database system.
		usort($models, 'strnatcasecmp');

		return lcfirst(implode('', $models)).'Relations';
	}

	/**
	 * Get the table associated with the model.
	 *
	 * @return string
	 */
	public function giveTable()
	{
		return $this->table ?: lcfirst(str_plural(get_class($this)));
	}


	/**
	 * Get the default foreign key name for the model.
	 *
	 * @return string
	 */
	public function giveForeignKey()
	{
		return lcfirst(class_basename($this)).'Id';
	}

}