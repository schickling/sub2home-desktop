<?php

class Backend_Ingredientcategories_Controller extends Backend_Controller {

	/**
	 * Returns the json object of a new store
	 * 
	 * @return string
	 */
	public function post_create()
	{
		
		$ingredient_category = new Ingredient_Category(array(
			'title' => 'Neue Kategorie',
			'phrase' => 'Frage',
			'including' => 0,
			'isSingle' => false
			));
		$ingredient_category->save();

		return eloquent_to_json($ingredient_category);
	}

	/**
	 * Removes an ingredient category
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$ingredient_category_id = (int) URI::segment(3);
		$ingredient_category = Ingredient_Category::find($ingredient_category_id);

		$ingredient_category->delete();
	}

	/**
	 * Updates an ingredient category
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$ingredient_category_id = (int) URI::segment(3);
		$ingredient_category = Ingredient_Category::find($ingredient_category_id);

		$ingredient_category->order = (int) $input->order;
		$ingredient_category->including = (int) $input->including;
		$ingredient_category->isSingle = (bool) $input->isSingle;
		$ingredient_category->phrase = $input->phrase;
		$ingredient_category->title = $input->title;

		$ingredient_category->save();

		return eloquent_to_json($ingredient_category);
	}

}