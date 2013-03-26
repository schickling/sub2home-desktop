<?php

use App\Models\IngredientCategoryModel;

class IngredientCategoryModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$ingredientCategories = $this->getData();

		foreach ($ingredientCategories as $ingredientCategory) {
			$ingredientCategoryModel = new IngredientCategoryModel($ingredientCategory);
			$ingredientCategoryModel->save();
		}

	}


	private function getData()
	{
		return array (

			array (
				// 'id' 			=> 1,
				'order' 		=> 1,
				'title' 		=> 'Brot',
				'smallImage'	=> 'img/static/ingredientcategories/smallimages/bread.png',
				'icon'			=> 'iBread',
				'isSingle'		=> true,
				'isMandatory'	=> true
				),

			array (
				// 'id' 			=> 2,
				'order' 		=> 2,
				'title' 		=> 'Käse',
				'smallImage'	=> 'img/static/ingredientcategories/smallimages/cheese.png',
				'icon'			=> 'iCheese',
				'isSingle'		=> true,
				'isMandatory'	=> false
				),

			array (
				// 'id' 			=> 3,
				'order' 		=> 3,
				'title' 		=> 'Gemüse',
				'smallImage'	=> 'img/static/ingredientcategories/smallimages/vegetables.png',
				'icon'			=> 'iVegetables',
				'isSingle'		=> false,
				'isMandatory'	=> false
				),

			array (
				// 'id' 			=> 4,
				'order' 		=> 4,
				'title' 		=> 'Extras',
				'smallImage'	=> 'img/static/ingredientcategories/smallimages/extras.png',
				'icon'			=> 'iExtras',
				'isSingle'		=> false,
				'isMandatory'	=> false
				),

			array (
				// 'id' 			=> 5,
				'order' 		=> 5,
				'title' 		=> 'Sauce',
				'smallImage'	=> 'img/static/ingredientcategories/smallimages/sauce.png',
				'icon'			=> 'iSauce',
				'isSingle'		=> false,
				'isMandatory'	=> false
				),



			);
}
}