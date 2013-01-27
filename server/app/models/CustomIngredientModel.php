<?php

/**
 * Custom Ingredient class
 *
 * A custom ingredient of an article. Just changes the charge
 */
class CustomIngredientModel extends BaseModel
{

	/**
	 * Returns the ingredient
	 * 
	 * @return object
	 */
	public function ingredientModel()
	{
		return $this->belongsTo('IngredientModel');
	}

	/**
	 * Returns the store
	 * 
	 * @return object
	 */
	public function storeModel()
	{
		return $this->belongsTo('StoreModel');
	}

}