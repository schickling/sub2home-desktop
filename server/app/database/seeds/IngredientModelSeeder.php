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
				'id' 							=> 1,
				'order' 						=> 0,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Cheese Oregano',
				'shortTitle'					=> 'Cheese Oregano',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/cheeseoregano.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 2,
				'order' 						=> 1,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Sesam',
				'shortTitle'					=> 'Sesam',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/sesam.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 3,
				'order' 						=> 2,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Italian',
				'shortTitle'					=> 'Italian',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/italian.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 4,
				'order' 						=> 3,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Vollkorn',
				'shortTitle'					=> 'Vollkorn',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/vollkorn.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 5,
				'order' 						=> 4,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Honey Oat',
				'shortTitle'					=> 'Honey Oat',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/honeyoat.png',
				'price'							=> 0.00
				),


// KÄSESORTEN ------------------
// -----------------------------



			array (
				'id' 							=> 6,
				'order' 						=> 5,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Cheddar Cheese',
				'shortTitle'					=> 'Cheddar',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/cheddar.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 7,
				'order' 						=> 6,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Scheibenkäse',
				'shortTitle'					=> 'Scheibenkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/scheibenkaese.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 8,
				'order' 						=> 7,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Streichkäse',
				'shortTitle'					=> 'Streichkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/streichkaese.png',
				'price'							=> 0.00
				),


// GEMÜSE ----------------------
// -----------------------------


			array (
				'id' 							=> 9,
				'order' 						=> 8,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Eisbergsalat',
				'shortTitle'					=> 'Salat',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/eisbergsalat.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 10,
				'order' 						=> 9,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Tomaten',
				'shortTitle'					=> 'Tomaten',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/tomate.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 11,
				'order' 						=> 10,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Salatgurke',
				'shortTitle'					=> 'Gurke',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/salatgurke.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 12,
				'order' 						=> 11,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Grüne Paprika',
				'shortTitle'					=> 'Paprika',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/paprika.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 13,
				'order' 						=> 12,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Rote Zwiebeln',
				'shortTitle'					=> 'Zwiebeln',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/zwiebel.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 14,
				'order' 						=> 13,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'schwarze Oliven',
				'shortTitle'					=> 'Oliven',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/olive.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 15,
				'order' 						=> 14,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Jalapeños (scharf)',
				'shortTitle'					=> 'Jalapeños',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/jalapeno.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 16,
				'order' 						=> 15,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Essiggurken',
				'shortTitle'					=> 'Essiggurken',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/essiggurke.png',
				'price'							=> 0.00
				),


// EXTRAS ----------------------
// -----------------------------


			array (
				'id' 							=> 17,
				'order' 						=> 16,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Doppelt Fleisch',
				'shortTitle'					=> 'Doppelt Fleisch',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/extrafleisch.png',
				'price'							=> 1.00
				),

			array (
				'id' 							=> 18,
				'order' 						=> 17,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Knuspriger Bacon',
				'shortTitle'					=> 'Bacon',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/bacon.png',
				'price'							=> 0.60
				),

			array (
				'id' 							=> 19,
				'order' 						=> 18,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Doppelt Käse',
				'shortTitle'					=> 'Doppelt Käse',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/doppeltkaese.png',
				'price'							=> 0.60
				),

			array (
				'id' 							=> 20,
				'order' 						=> 19,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Oregano',
				'shortTitle'					=> 'Oregano',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/oregano.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 21,
				'order' 						=> 20,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Salz',
				'shortTitle'					=> 'Salz',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/salz.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 22,
				'order' 						=> 21,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Pfeffer',
				'shortTitle'					=> 'Pfeffer',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/pfeffer.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 23,
				'order' 						=> 22,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Parmesan',
				'shortTitle'					=> 'Parmesan',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/parmesan.png',
				'price'							=> 0.00
				),


// SAUCEN ----------------------
// -----------------------------


			array (
				'id' 							=> 24,
				'order' 						=> 23,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Chipotle Southwest',
				'shortTitle'					=> 'Chipotle Southwest',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/chipotle.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 25,
				'order' 						=> 24,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Asiago Cesar',
				'shortTitle'					=> 'Asiago Cesar',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 26,
				'order' 						=> 25,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'BBQ-Sauce',
				'shortTitle'					=> 'BBQ-Sauce',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/barbecue.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 27,
				'order' 						=> 26,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Joghurt-Dressing',
				'shortTitle'					=> 'Joghurt-Dressing',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/joghurt.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 28,
				'order' 						=> 27,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Sweet Onion',
				'shortTitle'					=> 'Sweet Onion',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/sweetonion.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 29,
				'order' 						=> 28,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Honey Mustard',
				'shortTitle'					=> 'Honey Mustard',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/honeymustard.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 30,
				'order' 						=> 29,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Lite Mayonaise',
				'shortTitle'					=> 'Lite Mayonaise',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/litemayonaise.png',
				'price'							=> 0.00
				),

			array (
				'id' 							=> 31,
				'order' 						=> 30,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Hot Sauce',
				'shortTitle'					=> 'Hot Sauce',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/hotsauce.png',
				'price'							=> 0.00
				)

			);
}
}