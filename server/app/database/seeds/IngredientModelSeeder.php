<?php

use App\Models\IngredientModel;

class IngredientModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$ingredients = $this->getData();

		foreach ($ingredients as $ingredient) {
			$ingredientModel = new IngredientModel($ingredient);
			$ingredientModel->save();
		}

	}


	private function getData()
	{
		return array (


// BROTSORTEN ------------------
// -----------------------------

			array (
				// 'id' 							=> 1,
				'order' 						=> 0,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Cheese Oregano',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Cheese Oregano',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/bread/cheeseoregano.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 2,
				'order' 						=> 1,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Sesam',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Sesam',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/bread/sesam.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 3,
				'order' 						=> 2,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Italian',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Italian',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/bread/italian.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 4,
				'order' 						=> 3,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Vollkorn',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Vollkorn',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/bread/vollkorn.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 5,
				'order' 						=> 4,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Honey Oat',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Honey Oat',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/bread/honeyoat.png',
				'price'							=> 0.00
				),


// KÄSESORTEN ------------------
// -----------------------------



			array (
				// 'id' 							=> 6,
				'order' 						=> 5,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Cheddar Cheese',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Cheddar',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/cheddar.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 7,
				'order' 						=> 6,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Scheibenkäse',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Scheibenkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/scheibenkaese.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 8,
				'order' 						=> 7,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Streichkäse',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Streichkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/streichkaese.png',
				'price'							=> 0.00
				),


// GEMÜSE ----------------------
// -----------------------------


			array (
				// 'id' 							=> 9,
				'order' 						=> 8,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Eisbergsalat',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Salat',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/vegetables/eisbergsalat.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 10,
				'order' 						=> 9,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Tomaten',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Tomaten',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/vegetables/tomate.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 11,
				'order' 						=> 10,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Salatgurke',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Gurke',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/vegetables/salatgurke.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 12,
				'order' 						=> 11,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Essiggurken',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Essiggurken',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/vegetables/essiggurke.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 13,
				'order' 						=> 12,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Grüne Paprika',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Paprika',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/vegetables/paprika.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 14,
				'order' 						=> 13,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'schwarze Oliven',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Oliven',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/vegetables/olive.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 15,
				'order' 						=> 14,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Rote Zwiebeln',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Zwiebeln',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/vegetables/zwiebel.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 16,
				'order' 						=> 15,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Jalapeños (scharf)',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Jalapeños',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/vegetables/jalapeno.png',
				'price'							=> 0.00
				),


// EXTRAS ----------------------
// -----------------------------


			array (
				// 'id' 							=> 17,
				'order' 						=> 16,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Getoasted',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Getoasted',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/toasted.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 18,
				'order' 						=> 17,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Belag',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Extra Belag',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/extrafleisch.png',
				'price'							=> 1.00
				),

			// Footlong

			array (
				// 'id' 							=> 19,
				'order' 						=> 18,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Belag',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Extra Belag',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/extrafleisch.png',
				'price'							=> 2.00
				),

			array (
				// 'id' 							=> 20,
				'order' 						=> 19,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Knuspriger Bacon',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Bacon',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/bacon.png',
				'price'							=> 0.60
				),

			// Footlong

			array (
				// 'id' 							=> 21,
				'order' 						=> 20,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Knuspriger Bacon',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Bacon',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/bacon.png',
				'price'							=> 1.20
				),

			array (
				// 'id' 							=> 22,
				'order' 						=> 21,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Cheddar',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Extra Cheddar',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/cheddar.png',
				'price'							=> 0.30
				),

			// Footlong

			array (
				// 'id' 							=> 23,
				'order' 						=> 22,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Cheddar',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Extra Cheddar',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/cheddar.png',
				'price'							=> 0.60
				),



			array (
				// 'id' 							=> 24,
				'order' 						=> 23,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Scheibenkäse',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Extra Scheibenkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/scheibenkaese.png',
				'price'							=> 0.30
				),

			// Footlong

			array (
				// 'id' 							=> 25,
				'order' 						=> 14,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Scheibenkäse',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Extra Scheibenkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/scheibenkaese.png',
				'price'							=> 0.60
				),

			array (
				// 'id' 							=> 26,
				'order' 						=> 25,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Streichkäse',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Extra Streichkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/streichkaese.png',
				'price'							=> 0.30
				),

			// Footlong

			array (
				// 'id' 							=> 27,
				'order' 						=> 26,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Streichkäse',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Extra Streichkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/cheese/streichkaese.png',
				'price'							=> 0.60
				),

			array (
				// 'id' 							=> 28,
				'order' 						=> 27,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Oregano',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Oregano',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/oregano.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 29,
				'order' 						=> 28,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Salz',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Salz',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/salz.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 30,
				'order' 						=> 29,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Pfeffer',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Pfeffer',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/pfeffer.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 31,
				'order' 						=> 30,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Parmesan',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Parmesan',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/parmesan.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 32,
				'order' 						=> 31,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Essig',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Essig',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/essig.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 33,
				'order' 						=> 32,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Öl',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Öl',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/extras/oel.png',
				'price'							=> 0.00
				),


// SAUCEN ----------------------
// -----------------------------


			array (
				// 'id' 							=> 34,
				'order' 						=> 33,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Chipotle Southwest',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Chipotle Southwest',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/sauces/chipotle.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 35,
				'order' 						=> 34,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Asiago Cesar',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Asiago Cesar',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 36,
				'order' 						=> 35,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'BBQ-Sauce',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'BBQ-Sauce',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/sauces/barbecue.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 37,
				'order' 						=> 36,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Joghurt-Dressing',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Joghurt-Dressing',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/sauces/joghurt.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 38,
				'order' 						=> 37,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Sweet Onion',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Sweet Onion',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/sauces/sweetonion.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 39,
				'order' 						=> 38,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Honey Mustard',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Honey Mustard',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/sauces/honeymustard.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 40,
				'order' 						=> 39,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Lite Mayonaise',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Lite Mayonaise',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/sauces/litemayonaise.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 							=> 41,
				'order' 						=> 40,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Hot Sauce',
				'description'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'isPublished'					=> true,
				'shortcut'						=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'shortTitle'					=> 'Hot Sauce',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/largeimages/sauces/hotsauce.png',
				'price'							=> 0.00
				)
			
			);
}
}