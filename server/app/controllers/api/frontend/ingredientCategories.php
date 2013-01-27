<?php

/**
* 
*/
class Api_IngredientCategories_Controller extends Api_Controller
{
	public function get_index()
	{
		$ingredientCategories = Ingredient_Category::all();

		foreach ($ingredientCategories as $ingredientCategory) {
			$ingredientCategory->isSingle = (bool) $ingredientCategory->isSingle;
			$ingredientCategory->isMandatory = (bool) $ingredientCategory->isMandatory;
		}

		return eloquent_to_json($ingredientCategories);
	}

}