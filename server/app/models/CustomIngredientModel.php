<?php namespace App\Models;

/**
 * Custom Ingredient class
 *
 * A custom ingredient of an article. Just changes the charge
 */
class CustomIngredientModel extends CustomModel
{

	protected $table = 'custom_ingredient_models';

	/**
	 * Returns the ingredient
	 * 
	 * @return object
	 */
	public function ingredientModel()
	{
		return $this->belongsTo('App\\Models\\IngredientModel');
	}

}