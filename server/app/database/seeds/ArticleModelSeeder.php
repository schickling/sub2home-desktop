<?php

class ArticleModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$articles = $this->getData();

		foreach ($articles as $article) {

			$ingredient_model_ids = $article['ingredient_model_ids'];
			unset($article['ingredient_model_ids']);

			$articleModel = new ArticleModel($article);
			$articleModel->save();

			foreach ($ingredient_model_ids as $ingredient_model_id) {
				$articleModel->ingredientsCollection()->attach($ingredient_model_id);
			}

		}

	}


	private function getData()
	{
		
		return array (

			// SUBS ------------------------
			// -----------------------------

			array (
				'id' 					=> 1,
				'order' 				=> 1,
				'category_model_id'		=> 1,
				'title' 				=> 'BBQ Rib',
				'info'					=> '6inch',
				'description'			=> 'BBQ Rib-Hacksteak mit rauchiger BBQ Sauce, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/bbqrib.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/bbqrib.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)
				),

			array (
				'id' 					=> 2,
				'order' 				=> 2,
				'category_model_id'		=> 1,
				'title' 				=> 'Chicken Fajita',
				'info'					=> '6inch',
				'description'			=> 'mit würzigen Hähnchenbruststreifen, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/ckfajita6g.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/ckfajita6g.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)

				),

			array (
				'id' 					=> 3,
				'order' 				=> 3,
				'category_model_id'		=> 1,
				'title' 				=> 'Chicken Teriyaki',
				'info'					=> '6inch',
				'description'			=> 'mit süß-sauren Hähnchenbruststreifen in einer Teriyaki-Marinade, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/ckteriyaki6g.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/ckteriyaki6g.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 4,
				'order' 				=> 4,
				'category_model_id' 	=> 1,
				'title' 				=> 'Ham',
				'info'					=> '6inch',
				'description'			=> 'mit leckerem Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/ham6g.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/ham6g.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 5,
				'order' 				=> 5,
				'category_model_id'		=> 1,
				'title' 				=> 'Italian B.M.T.',
				'info'					=> '6inch',
				'description'			=> 'mit leckerem Hinterschinken, Salami, Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/bmt.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/bmt.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 6,
				'order' 				=> 6,
				'category_model_id'		=> 1,
				'title' 				=> 'Roasted Chicken Breast',
				'info'					=> '6inch',
				'description'			=> 'mit geröstetem Hähnchenbrustfilet, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/roastedchickenbreast6g.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/roastedchickenbreast6g.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 7,
				'order' 				=> 7,
				'category_model_id' 	=> 1,
				'title' 				=> 'Salami',
				'info'					=> '6inch',
				'description'			=> 'mit Salami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/salami.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/salami.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 8,
				'order' 				=> 8,
				'category_model_id' 	=> 1,
				'title' 				=> 'Spicy Italian',
				'info'					=> '6inch',
				'description'			=> 'mit Salami und Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/spicyitalian.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/spicyitalian.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 9,
				'order' 				=> 9,
				'category_model_id' 	=> 1,
				'title' 				=> 'Steak & Cheese',
				'info'					=> '6inch',
				'description'			=> 'mit zartem Steakfleisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/steakcheese.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/steakcheese.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 10,
				'order' 				=> 10,
				'category_model_id' 	=> 1,
				'title' 				=> 'Tuna',
				'info'					=> '6inch',
				'description'			=> 'Thunfischcreme mit Lite-Mayonnaise, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/tuna.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/tuna.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 11,
				'order' 				=> 11,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey',
				'info'					=> '6inch',
				'description'			=> 'mit Truthahnbrust, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkey6g.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkey6g.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 12,
				'order' 				=> 12,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey & Ham',
				'info'					=> '6inch',
				'description'			=> 'mit Truthahnbrust und Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkeyham6g.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkeyham6g.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 13,
				'order' 				=> 13,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey, Ham & Bacon Melt',
				'info'					=> '6inch',
				'description'			=> 'mit Truthahnbrust, Hinterschinken und knusprigem Bacon, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkeyhambaconmelt.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkeyhambaconmelt.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 14,
				'order' 				=> 14,
				'category_model_id' 	=> 1,
				'title' 				=> 'Veggie Delite',
				'info'					=> '6inch',
				'description'			=> 'rein vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/veggiedelite6g.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/veggiedelite6g.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()

				),

			array (
				'id' 					=> 15,
				'order' 				=> 15,
				'category_model_id'		=> 1,
				'title' 				=> 'Veggie Patty',
				'info'					=> '6inch',
				'description'			=> 'mit einem Gemüsebratling - 100% vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/veggiepatty.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/veggiepatty.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			// WRAPS -----------------------
			// -----------------------------


			array (
				'id' 					=> 16,
				'order' 				=> 16,
				'category_model_id'		=> 2,
				'title' 				=> 'BBQ Rib',
				'info'					=> '',
				'description'			=> 'BBQ Rib-Hacksteak mit rauchiger BBQ Sauce, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 17,
				'order' 				=> 17,
				'category_model_id'		=> 2,
				'title' 				=> 'Chicken Fajita',
				'info'					=> '',
				'description'			=> 'mit würzigen Hähnchenbruststreifen, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()

				),

			array (
				'id' 					=> 18,
				'order' 				=> 18,
				'category_model_id'		=> 2,
				'title' 				=> 'Chicken Teriyaki',
				'info'					=> '',
				'description'			=> 'mit süß-sauren Hähnchenbruststreifen in einer Teriyaki-Marinade, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 19,
				'order' 				=> 19,
				'category_model_id' 	=> 2,
				'title' 				=> 'Ham',
				'info'					=> '',
				'description'			=> 'mit leckerem Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 20,
				'order' 				=> 20,
				'category_model_id'		=> 2,
				'title' 				=> 'Italian B.M.T.',
				'info'					=> '',
				'description'			=> 'mit leckerem Hinterschinken, Salami, Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 21,
				'order' 				=> 21,
				'category_model_id'		=> 2,
				'title' 				=> 'Roasted Chicken Breast',
				'info'					=> '',
				'description'			=> 'mit geröstetem Hähnchenbrustfilet, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 22,
				'order' 				=> 22,
				'category_model_id' 	=> 2,
				'title' 				=> 'Salami',
				'info'					=> '',
				'description'			=> 'mit Salami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 23,
				'order' 				=> 23,
				'category_model_id' 	=> 2,
				'title' 				=> 'Spicy Italian',
				'info'					=> '',
				'description'			=> 'mit Salami und Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 24,
				'order' 				=> 24,
				'category_model_id' 	=> 2,
				'title' 				=> 'Steak & Cheese',
				'info'					=> '',
				'description'			=> 'mit zartem Steakfleisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 25,
				'order' 				=> 25,
				'category_model_id' 	=> 2,
				'title' 				=> 'Tuna',
				'info'					=> '',
				'description'			=> 'Thunfischcreme mit Lite-Mayonnaise, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 26,
				'order' 				=> 26,
				'category_model_id' 	=> 2,
				'title' 				=> 'Turkey',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 27,
				'order' 				=> 27,
				'category_model_id' 	=> 2,
				'title' 				=> 'Turkey & Ham',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust und Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 28,
				'order' 				=> 28,
				'category_model_id' 	=> 2,
				'title' 				=> 'Turkey, Ham & Bacon Melt',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust, Hinterschinken und knusprigem Bacon, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 29,
				'order' 				=> 29,
				'category_model_id' 	=> 2,
				'title' 				=> 'Veggie Delite',
				'info'					=> '',
				'description'			=> 'rein vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()

				),

			array (
				'id' 					=> 30,
				'order' 				=> 30,
				'category_model_id'		=> 2,
				'title' 				=> 'Veggie Patty',
				'info'					=> '',
				'description'			=> 'mit einem Gemüsebratling - 100% vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			// SALATE ----------------------
			// -----------------------------


			array (
				'id' 					=> 31,
				'order' 				=> 31,
				'category_model_id'		=> 3,
				'title' 				=> 'BBQ Rib',
				'info'					=> '',
				'description'			=> 'BBQ Rib-Hacksteak mit rauchiger BBQ Sauce, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 32,
				'order' 				=> 32,
				'category_model_id'		=> 3,
				'title' 				=> 'Chicken Fajita',
				'info'					=> '',
				'description'			=> 'mit würzigen Hähnchenbruststreifen, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()

				),

			array (
				'id' 					=> 33,
				'order' 				=> 33,
				'category_model_id'		=> 3,
				'title' 				=> 'Chicken Teriyaki',
				'info'					=> '',
				'description'			=> 'mit süß-sauren Hähnchenbruststreifen in einer Teriyaki-Marinade, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 34,
				'order' 				=> 34,
				'category_model_id' 	=> 3,
				'title' 				=> 'Ham',
				'info'					=> '',
				'description'			=> 'mit leckerem Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 35,
				'order' 				=> 35,
				'category_model_id'		=> 3,
				'title' 				=> 'Italian B.M.T.',
				'info'					=> '',
				'description'			=> 'mit leckerem Hinterschinken, Salami, Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 36,
				'order' 				=> 36,
				'category_model_id'		=> 3,
				'title' 				=> 'Roasted Chicken Breast',
				'info'					=> '',
				'description'			=> 'mit geröstetem Hähnchenbrustfilet, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 37,
				'order' 				=> 37,
				'category_model_id' 	=> 3,
				'title' 				=> 'Salami',
				'info'					=> '',
				'description'			=> 'mit Salami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 38,
				'order' 				=> 38,
				'category_model_id' 	=> 3,
				'title' 				=> 'Spicy Italian',
				'info'					=> '',
				'description'			=> 'mit Salami und Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 39,
				'order' 				=> 39,
				'category_model_id' 	=> 3,
				'title' 				=> 'Steak & Cheese',
				'info'					=> '',
				'description'			=> 'mit zartem Steakfleisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 40,
				'order' 				=> 40,
				'category_model_id' 	=> 3,
				'title' 				=> 'Tuna',
				'info'					=> '',
				'description'			=> 'Thunfischcreme mit Lite-Mayonnaise, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 41,
				'order' 				=> 41,
				'category_model_id' 	=> 3,
				'title' 				=> 'Turkey',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 42,
				'order' 				=> 42,
				'category_model_id' 	=> 3,
				'title' 				=> 'Turkey & Ham',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust und Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 43,
				'order' 				=> 43,
				'category_model_id' 	=> 3,
				'title' 				=> 'Turkey, Ham & Bacon Melt',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust, Hinterschinken und knusprigem Bacon, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),	

			array (
				'id' 					=> 44,
				'order' 				=> 44,
				'category_model_id' 	=> 3,
				'title' 				=> 'Veggie Delite',
				'info'					=> '',
				'description'			=> 'rein vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()

				),

			array (
				'id' 					=> 45,
				'order' 				=> 45,
				'category_model_id'		=> 3,
				'title' 				=> 'Veggie Patty',
				'info'					=> '',
				'description'			=> 'mit einem Gemüsebratling - 100% vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			// COOKIES ---------------------
			// -----------------------------


			array (
				'id' 					=> 46,
				'order' 				=> 46,
				'category_model_id'		=> 4,
				'title' 				=> 'Chocolate Chip',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit Vollmilchschokostücken',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/chocolatechip.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/chocolatechip.png',
				'price'					=> 0.89,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 47,
				'order' 				=> 47,
				'category_model_id'		=> 4,
				'title' 				=> 'Chocolate Chip Rainbow Candy',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit Vollmilchschokostücken und Smarties',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/rainbowcandy.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/rainbowcandy.png',
				'price'					=> 0.89,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 48,
				'order' 				=> 48,
				'category_model_id'		=> 4,
				'title' 				=> 'Double Chocolate Chip',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit weißen Schokoladenstücken',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/doublechocolatechip.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/doublechocolatechip.png',
				'price'					=> 0.89,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 49,
				'order' 				=> 49,
				'category_model_id'		=> 4,
				'title' 				=> 'White Chip Macadamia Nut',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit weißen Macadamia Nüssen',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/macadmianut.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/macadamianut.png',
				'price'					=> 0.89,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			// MUFFINS ---------------------
			// -----------------------------


			array (
				'id' 					=> 50,
				'order' 				=> 50,
				'category_model_id'		=> 4,
				'title' 				=> 'Milka Schoko-Muffin',
				'info'					=> '',
				'description'			=> 'leckerer Schoko-Muffin mit Milka-Alpenmilchschokolade',
				'smallImage'			=> 'img/static/articles/smallimages/muffins/milkamuffin.png',
				'largeImage'			=> 'img/static/articles/largeimages/muffins/milkamuffin.png',
				'price'					=> 1.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 51,
				'order' 				=> 51,
				'category_model_id'		=> 4,
				'title' 				=> 'Deep Blueberry',
				'info'					=> '',
				'description'			=> 'Muffin mit Blaubeeren',
				'smallImage'			=> 'img/static/articles/smallimages/muffins/milkamuffin.png',
				'largeImage'			=> 'img/static/articles/largeimages/muffins/milkamuffin.png',
				'price'					=> 1.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 52,
				'order' 				=> 52,
				'category_model_id'		=> 4,
				'title' 				=> 'Rich Chocolate Muffin',
				'info'					=> '',
				'description'			=> 'Schokoladenmuffin',
				'smallImage'			=> 'img/static/articles/smallimages/muffins/milkamuffin.png',
				'largeImage'			=> 'img/static/articles/largeimages/muffins/milkamuffin.png',
				'price'					=> 1.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			// DONUTS ----------------------
			// -----------------------------


			array (
				'id' 					=> 53,
				'order' 				=> 53,
				'category_model_id'		=> 4,
				'title' 				=> 'Milka Schoko-Donut',
				'info'					=> '',
				'description'			=> 'leckerer Schoko-Donut mit Milka-Alpenmilchschokolade',
				'smallImage'			=> 'img/static/articles/smallimages/donuts/milkadonut.png',
				'largeImage'			=> 'img/static/articles/largeimages/donuts/milkadonut.png',
				'price'					=> 1.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			// CHIPS -----------------------
			// -----------------------------


			array (
				'id' 					=> 54,
				'order' 				=> 54,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Paprika',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Paprika. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/laysclassic.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/laysclassic.png',
				'price'					=> 0.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 55,
				'order' 				=> 55,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Salt & Vinegar',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Salt & Vinegar. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/layssaltvinegar.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/layssaltvinegar.png',
				'price'					=> 0.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 56,
				'order' 				=> 56,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Cheese & Onion',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Cheese & Onion. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/laysclassic.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/laysclassic.png',
				'price'					=> 0.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 57,
				'order' 				=> 57,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Salted',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Gesalzen. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/laysclassic.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/laysclassic.png',
				'price'					=> 0.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 58,
				'order' 				=> 58,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Barbecue',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Barbecue. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/laysbarbecue.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/laysbarbecue.png',
				'price'					=> 0.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 59,
				'order' 				=> 59,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Sourcream & Onion',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Sourcream & Onion. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/layssourcreamonion.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/layssourcreamonion.png',
				'price'					=> 0.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			array (
				'id' 					=> 60,
				'order' 				=> 60,
				'category_model_id'		=> 4,
				'title' 				=> 'Doritos Nacho Cheese',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Doritos Nacho Cheese. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/doritosnachocheese.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/doritosnachocheese.png',
				'price'					=> 0.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 61,
				'order' 				=> 61,
				'category_model_id'		=> 4,
				'title' 				=> 'Doritos Sweet Chili Pepper',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Doritos Sweet Chili Pepper. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/doritosnachocheese.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/doritosnachocheese.png',
				'price'					=> 0.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			// GETRÄNKE --------------------
			// -----------------------------


			array (
				'id' 					=> 62,
				'order' 				=> 62,
				'category_model_id'		=> 5,
				'title' 				=> 'Coca Cola',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/coke.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/coke.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 63,
				'order' 				=> 63,
				'category_model_id'		=> 5,
				'title' 				=> 'Coca Cola Light',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/cokelight.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/cokelight.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 64,
				'order' 				=> 64,
				'category_model_id'		=> 5,
				'title' 				=> 'Fanta',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/fanta.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/fanta.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 65,
				'order' 				=> 65,
				'category_model_id'		=> 5,
				'title' 				=> 'Sprite',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/sprite.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/sprite.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			array (
				'id' 					=> 66,
				'order' 				=> 66,
				'category_model_id'		=> 5,
				'title' 				=> 'Apfelschorle',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/apfelschorle.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/apfelschorle.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 67,
				'order' 				=> 67,
				'category_model_id'		=> 5,
				'title' 				=> 'Nestea Pfirsich',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/nesteapfirsich.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/nesteapfirsich.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),


			array (
				'id' 					=> 68,
				'order' 				=> 68,
				'category_model_id'		=> 5,
				'title' 				=> 'Nestea Zitrone',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/nesteazitrone.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/nesteazitrone.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 69,
				'order' 				=> 69,
				'category_model_id'		=> 5,
				'title' 				=> 'Apollinaris Classic',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/apoclassic.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/apoclassic.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				),

			array (
				'id' 					=> 70,
				'order' 				=> 70,
				'category_model_id'		=> 5,
				'title' 				=> 'Vio Mineralwasser',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/vio.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/vio.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				)
			);
}

}