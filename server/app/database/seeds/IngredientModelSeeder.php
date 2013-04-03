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
				// 'id' 						=> 1,
				'order' 						=> 0,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Cheese Oregano',
				'description'					=> 'Weißbrot mit Käse und Oregano',
				'isPublished'					=> true,
				'shortcut'						=> 'CO',
				'shortTitle'					=> 'Cheese Oregano',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/cheeseoregano.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/bread/cheeseoregano.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 2,
				'order' 						=> 1,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Sesam',
				'description'					=> 'Weißbrot mit Sesam',
				'isPublished'					=> true,
				'shortcut'						=> 'SE',
				'shortTitle'					=> 'Sesam',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/sesam.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/bread/sesam.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 3,
				'order' 						=> 2,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Italian',
				'description'					=> 'Italienisches Weißbrot',
				'isPublished'					=> true,
				'shortcut'						=> 'IT',
				'shortTitle'					=> 'Italian',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/italian.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/bread/italian.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 4,
				'order' 						=> 3,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Vollkorn',
				'description'					=> 'Vollkornbrot mit Roggen',
				'isPublished'					=> true,
				'shortcut'						=> 'VK',
				'shortTitle'					=> 'Vollkorn',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/vollkorn.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/bread/vollkorn.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 5,
				'order' 						=> 4,
				'ingredient_category_model_id'	=> 1,
				'title' 						=> 'Honey Oat',
				'description'					=> 'Vollkornbrot mit Honighaferflocken',
				'isPublished'					=> true,
				'shortcut'						=> 'HO',
				'shortTitle'					=> 'Honey Oat',
				'largeImage'					=> 'img/static/ingredients/largeimages/bread/honeyoat.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/bread/honeyoat.png',
				'price'							=> 0.00
				),


// KÄSESORTEN ------------------
// -----------------------------



			array (
				// 'id' 						=> 6,
				'order' 						=> 5,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Cheddar Cheese',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Cc',
				'shortTitle'					=> 'Cheddar',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/cheddar.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/cheddar.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 7,
				'order' 						=> 6,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Scheibenkäse',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'SK',
				'shortTitle'					=> 'Scheibenkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/scheibenkaese.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/scheibenkaese.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 8,
				'order' 						=> 7,
				'ingredient_category_model_id'	=> 2,
				'title' 						=> 'Streichkäse',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'St',
				'shortTitle'					=> 'Streichkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/streichkaese.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/streichkaese.png',
				'price'							=> 0.00
				),


// GEMÜSE ----------------------
// -----------------------------


			array (
				// 'id' 						=> 9,
				'order' 						=> 8,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Eisbergsalat',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Sa',
				'shortTitle'					=> 'Salat',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/eisbergsalat.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/vegetables/eisbergsalat.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 10,
				'order' 						=> 9,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Tomaten',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'To',
				'shortTitle'					=> 'Tomaten',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/tomate.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/vegetables/tomate.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 11,
				'order' 						=> 10,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Salatgurke',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Gu',
				'shortTitle'					=> 'Gurke',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/salatgurke.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/vegetables/salatgurke.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 12,
				'order' 						=> 11,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Essiggurken',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'EG',
				'shortTitle'					=> 'Essiggurken',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/essiggurke.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/vegetables/essiggurke.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 13,
				'order' 						=> 12,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Grüne Paprika',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Pa',
				'shortTitle'					=> 'Paprika',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/paprika.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/vegetables/paprika.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 14,
				'order' 						=> 13,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'schwarze Oliven',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ol',
				'shortTitle'					=> 'Oliven',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/olive.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/vegetables/olive.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 15,
				'order' 						=> 14,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Rote Zwiebeln',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Zw',
				'shortTitle'					=> 'Zwiebeln',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/zwiebel.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/vegetables/zwiebel.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 16,
				'order' 						=> 15,
				'ingredient_category_model_id'	=> 3,
				'title' 						=> 'Jalapeños (scharf)',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ja',
				'shortTitle'					=> 'Jalapeños',
				'largeImage'					=> 'img/static/ingredients/largeimages/vegetables/jalapeno.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/vegetables/jalapeno.png',
				'price'							=> 0.00
				),


// EXTRAS ----------------------
// -----------------------------


			array (
				// 'id' 						=> 17,
				'order' 						=> 16,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Getoasted',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Toa',
				'shortTitle'					=> 'Getoasted',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/toasted.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/toasted.png',
				'price'							=> 0.00
				),

			// 6-inch

			array (
				// 'id' 						=> 18,
				'order' 						=> 17,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Belag',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'DM',
				'shortTitle'					=> 'Extra Belag',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/extrabelag.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/extrabelag.png',
				'price'							=> 1.00
				),

			// Footlong

			array (
				// 'id' 						=> 19,
				'order' 						=> 18,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Belag',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'DM',
				'shortTitle'					=> 'Extra Belag',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/extrabelag.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/extrabelag.png',
				'price'							=> 2.00
				),

			// 6-inch

			array (
				// 'id' 						=> 20,
				'order' 						=> 19,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Knuspriger Bacon',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex Ba',
				'shortTitle'					=> 'Bacon',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/bacon.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/bacon.png',
				'price'							=> 0.60
				),

			// Footlong

			array (
				// 'id' 						=> 21,
				'order' 						=> 20,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Knuspriger Bacon',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex Ba',
				'shortTitle'					=> 'Bacon',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/bacon.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/bacon.png',
				'price'							=> 1.20
				),

			// Sub-Platte

			array (
				// 'id' 						=> 22,
				'order' 						=> 21,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Knuspriger Bacon',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex Ba',
				'shortTitle'					=> 'Bacon',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/bacon.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/bacon.png',
				'price'							=> 4.80
				),

			// 6-inch

			array (
				// 'id' 						=> 23,
				'order' 						=> 22,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Cheddar',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex Cc',
				'shortTitle'					=> 'Extra Cheddar',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/cheddar.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/cheddar.png',
				'price'							=> 0.30
				),

			// Footlong

			array (
				// 'id' 						=> 24,
				'order' 						=> 23,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Cheddar',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex Cc',
				'shortTitle'					=> 'Extra Cheddar',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/cheddar.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/cheddar.png',
				'price'							=> 0.60
				),

			// Sub-Platte

			array (
				// 'id' 						=> 25,
				'order' 						=> 24,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Cheddar',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex Cc',
				'shortTitle'					=> 'Extra Cheddar',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/cheddar.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/cheddar.png',
				'price'							=> 2.40
				),

			// 6-inch

			array (
				// 'id' 						=> 26,
				'order' 						=> 25,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Scheibenkäse',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex SK',
				'shortTitle'					=> 'Extra Scheibenkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/scheibenkaese.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/scheibenkaese.png',
				'price'							=> 0.30
				),

			// Footlong

			array (
				// 'id' 						=> 27,
				'order' 						=> 26,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Scheibenkäse',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex SK',
				'shortTitle'					=> 'Extra Scheibenkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/scheibenkaese.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/scheibenkaese.png',
				'price'							=> 0.60
				),

			// Sub-Platte

			array (
				// 'id' 						=> 28,
				'order' 						=> 27,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Scheibenkäse',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex SK',
				'shortTitle'					=> 'Extra Scheibenkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/scheibenkaese.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/scheibenkaese.png',
				'price'							=> 2.40
				),

			// 6-inch

			array (
				// 'id' 						=> 29,
				'order' 						=> 28,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Streichkäse',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex St',
				'shortTitle'					=> 'Extra Streichkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/streichkaese.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/streichkaese.png',
				'price'							=> 0.30
				),

			// Footlong

			array (
				// 'id' 						=> 30,
				'order' 						=> 29,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Streichkäse',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex St',
				'shortTitle'					=> 'Extra Streichkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/streichkaese.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/streichkaese.png',
				'price'							=> 0.60
				),

			// Sub-Platte

			array (
				// 'id' 						=> 31,
				'order' 						=> 30,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Extra Streichkäse',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Ex St',
				'shortTitle'					=> 'Extra Streichkäse',
				'largeImage'					=> 'img/static/ingredients/largeimages/cheese/streichkaese.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/cheese/streichkaese.png',
				'price'							=> 2.40
				),

			array (
				// 'id' 						=> 32,
				'order' 						=> 31,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Oregano',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'OR',
				'shortTitle'					=> 'Oregano',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/oregano.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/oregano.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 33,
				'order' 						=> 32,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Salz',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'SZ',
				'shortTitle'					=> 'Salz',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/salz.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/salz.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 34,
				'order' 						=> 33,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Pfeffer',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'PF',
				'shortTitle'					=> 'Pfeffer',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/pfeffer.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/pfeffer.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 35,
				'order' 						=> 34,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Parmesan',
				'description'					=> 'Geriebener Hartkäse',
				'isPublished'					=> true,
				'shortcut'						=> 'Kä',
				'shortTitle'					=> 'Parmesan',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/parmesan.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/parmesan.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 36,
				'order' 						=> 35,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Essig',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'ES',
				'shortTitle'					=> 'Essig',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/essig.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/essig.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 37,
				'order' 						=> 36,
				'ingredient_category_model_id'	=> 4,
				'title' 						=> 'Öl',
				'description'					=> '',
				'isPublished'					=> true,
				'shortcut'						=> 'Öl',
				'shortTitle'					=> 'Öl',
				'largeImage'					=> 'img/static/ingredients/largeimages/extras/oel.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/extras/oel.png',
				'price'							=> 0.00
				),


// SAUCEN ----------------------
// -----------------------------


			array (
				// 'id' 						=> 38,
				'order' 						=> 37,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Chipotle Southwest',
				'description'					=> 'Herzhaft-scharfe Chilli-Soße',
				'isPublished'					=> true,
				'shortcut'						=> 'CS',
				'shortTitle'					=> 'Chipotle Southwest',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/chipotle.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/sauces/chipotle.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 39,
				'order' 						=> 38,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Asiago Cesar',
				'description'					=> 'Herzhafte Käse-Knoblauch-Soße',
				'isPublished'					=> true,
				'shortcut'						=> 'AS',
				'shortTitle'					=> 'Asiago Cesar',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/asiago.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/sauces/asiago.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 40,
				'order' 						=> 39,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'BBQ-Sauce',
				'description'					=> 'Würzig-rauchige BBQ-Sauce',
				'isPublished'					=> true,
				'shortcut'						=> 'BQ',
				'shortTitle'					=> 'BBQ-Sauce',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/barbecue.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/sauces/barbecue.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 41,
				'order' 						=> 40,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Joghurt-Dressing',
				'description'					=> 'Joghurt-Soße',
				'isPublished'					=> true,
				'shortcut'						=> 'Jo',
				'shortTitle'					=> 'Joghurt-Dressing',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/joghurt.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/sauces/joghurt.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 42,
				'order' 						=> 41,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Sweet Onion',
				'description'					=> 'Süße Zwiebelsoße',
				'isPublished'					=> true,
				'shortcut'						=> 'SO',
				'shortTitle'					=> 'Sweet Onion',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/sweetonion.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/sauces/sweetonion.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 43,
				'order' 						=> 42,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Honey Mustard',
				'description'					=> 'Milde Honig-Senf-Soße',
				'isPublished'					=> true,
				'shortcut'						=> 'HM',
				'shortTitle'					=> 'Honey Mustard',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/honeymustard.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/sauces/honeymustard.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 44,
				'order' 						=> 43,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Lite Mayonaise',
				'description'					=> 'Lite Mayonaise - Nur 35% Fett',
				'isPublished'					=> true,
				'shortcut'						=> 'LM',
				'shortTitle'					=> 'Lite Mayonaise',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/litemayonaise.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/sauces/litemayonaise.png',
				'price'							=> 0.00
				),

			array (
				// 'id' 						=> 45,
				'order' 						=> 44,
				'ingredient_category_model_id'	=> 5,
				'title' 						=> 'Hot Sauce',
				'description'					=> 'Feurig scharfe Soße',
				'isPublished'					=> true,
				'shortcut'						=> 'HOT',
				'shortTitle'					=> 'Hot Sauce',
				'largeImage'					=> 'img/static/ingredients/largeimages/sauces/hotsauce.png',
				'smallImage'					=> 'img/static/ingredients/smallimages/sauces/hotsauce.png',
				'price'							=> 0.00
				)
			
			);
}
}