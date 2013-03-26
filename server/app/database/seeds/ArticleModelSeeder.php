<?php

use App\Models\ArticleModel;

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
				'category_model_id'		=> 1,
				'title' 				=> 'BBQ Rib',
				'info'					=> '6inch',
				'description'			=> 'BBQ Rib-Hacksteak mit rauchiger BBQ Sauce, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/bbqrib-st.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/bbqrib-st.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 2,
				'category_model_id'		=> 1,
				'title' 				=> 'BBQ Rib',
				'info'					=> 'footlong',
				'description'			=> 'BBQ Rib-Hacksteak mit rauchiger BBQ Sauce, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/bbqribFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/bbqribFtlng-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 3,
				'category_model_id'		=> 1,
				'title' 				=> 'Chicken Fajita',
				'info'					=> '6inch',
				'description'			=> 'mit würzigen Hähnchenbruststreifen, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/ckfajita-st.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/ckfajita6g-st.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 4,
				'category_model_id'		=> 1,
				'title' 				=> 'Chicken Fajita',
				'info'					=> 'footlong',
				'description'			=> 'mit würzigen Hähnchenbruststreifen, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/ckfajitaFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/ckfajitaFtlng6g-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 5,
				'category_model_id'		=> 1,
				'title' 				=> 'Chicken Teriyaki',
				'info'					=> '6inch',
				'description'			=> 'mit süß-sauren Hähnchenbruststreifen in einer Teriyaki-Marinade, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/ckteriyaki-st.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/ckteriyaki6g-st.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 6,
				'category_model_id'		=> 1,
				'title' 				=> 'Chicken Teriyaki',
				'info'					=> 'footlong',
				'description'			=> 'mit süß-sauren Hähnchenbruststreifen in einer Teriyaki-Marinade, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/ckteriyakiFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/ckteriyakiFtlng6g-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 7,
				'category_model_id' 	=> 1,
				'title' 				=> 'Ham',
				'info'					=> '6inch',
				'description'			=> 'mit leckerem Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/ham-sml.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/ham6g-sml.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 8,
				'category_model_id' 	=> 1,
				'title' 				=> 'Ham',
				'info'					=> 'footlong',
				'description'			=> 'mit leckerem Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/hamFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/hamFtlng6g-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 9,
				'category_model_id'		=> 1,
				'title' 				=> 'Italian B.M.T.',
				'info'					=> '6inch',
				'description'			=> 'mit leckerem Hinterschinken, Salami, Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/bmt-smt.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/bmt-smt.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 10,
				'category_model_id'		=> 1,
				'title' 				=> 'Italian B.M.T.',
				'info'					=> 'footlong',
				'description'			=> 'mit leckerem Hinterschinken, Salami, Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/bmtFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/bmtFtlng-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 11,
				'category_model_id'		=> 1,
				'title' 				=> 'Roasted Chicken Breast',
				'info'					=> '6inch',
				'description'			=> 'mit geröstetem Hähnchenbrustfilet, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/roastedchickenbreast-sm.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/roastedchickenbreast6g-sm.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 12,
				'category_model_id'		=> 1,
				'title' 				=> 'Roasted Chicken Breast',
				'info'					=> 'footlong',
				'description'			=> 'mit geröstetem Hähnchenbrustfilet, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/roastedchickenbreastFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/roastedchickenbreastFtlng6g-ft.png',
				'price'					=> 5.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 13,
				'category_model_id' 	=> 1,
				'title' 				=> 'Salami',
				'info'					=> '6inch',
				'description'			=> 'mit Salami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/salami-sml.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/salami-sml.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 14,
				'category_model_id' 	=> 1,
				'title' 				=> 'Salami',
				'info'					=> 'footlong',
				'description'			=> 'mit Salami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/salamiFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/salamiFtlng-ft.png',
				'price'					=> 5.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 15,
				'category_model_id' 	=> 1,
				'title' 				=> 'Spicy Italian',
				'info'					=> '6inch',
				'description'			=> 'mit Salami und Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/spicyitalian-sm.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/spicyitalian-sm.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 16,
				'category_model_id' 	=> 1,
				'title' 				=> 'Spicy Italian',
				'info'					=> 'footlong',
				'description'			=> 'mit Salami und Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/spicyitalianFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/spicyitalianFtlng-ft.png',
				'price'					=> 5.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),	

			array (
				'id' 					=> 17,
				'category_model_id' 	=> 1,
				'title' 				=> 'Steak & Cheese',
				'info'					=> '6inch',
				'description'			=> 'mit zartem Steakfleisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/steakcheese-smt.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/steakcheese-smt.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 18,
				'category_model_id' 	=> 1,
				'title' 				=> 'Steak & Cheese',
				'info'					=> 'footlong',
				'description'			=> 'mit zartem Steakfleisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/steakcheeseFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/steakcheeseFtlng-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 19,
				'category_model_id' 	=> 1,
				'title' 				=> 'Tuna',
				'info'					=> '6inch',
				'description'			=> 'Thunfischcreme mit Lite-Mayonnaise, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/tuna-smt.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/tuna-smt.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 20,
				'category_model_id' 	=> 1,
				'title' 				=> 'Tuna',
				'info'					=> 'footlong',
				'description'			=> 'Thunfischcreme mit Lite-Mayonnaise, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/tunaFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/tunaFtlng-ft.png',
				'price'					=> 5.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 21,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey',
				'info'					=> '6inch',
				'description'			=> 'mit Truthahnbrust, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkey-smt.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkey6g-smt.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 22,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey',
				'info'					=> 'footlong',
				'description'			=> 'mit Truthahnbrust, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkeyFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkeyFtlng6g-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 23,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey & Ham',
				'info'					=> '6inch',
				'description'			=> 'mit Truthahnbrust und Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkeyham-sm.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkeyham6g-sm.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),	

			array (
				'id' 					=> 24,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey & Ham',
				'info'					=> 'footlong',
				'description'			=> 'mit Truthahnbrust und Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkeyhamFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkeyhamFtlng6g-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 25,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey, Ham & Bacon Melt',
				'info'					=> '6inch',
				'description'			=> 'mit Truthahnbrust, Hinterschinken und knusprigem Bacon, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkeyhambaconmelt-smt.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkeyhambaconmelt-smt.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 26,
				'category_model_id' 	=> 1,
				'title' 				=> 'Turkey, Ham & Bacon Melt',
				'info'					=> 'footlong',
				'description'			=> 'mit Truthahnbrust, Hinterschinken und knusprigem Bacon, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/turkeyhambaconmeltFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/turkeyhambaconmeltFtlng-ft.png',
				'price'					=> 5.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 27,
				'category_model_id' 	=> 1,
				'title' 				=> 'Veggie Delite',
				'info'					=> '6inch',
				'description'			=> 'rein vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/veggiedelite-sl.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/veggiedelite6g-sl.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 28,
				'category_model_id' 	=> 1,
				'title' 				=> 'Veggie Delite',
				'info'					=> 'footlong',
				'description'			=> 'rein vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/veggiedeliteFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/veggiedeliteFtlng6g-ft.png',
				'price'					=> 5.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),


			array (
				'id' 					=> 29,
				'category_model_id'		=> 1,
				'title' 				=> 'Veggie Patty',
				'info'					=> '6inch',
				'description'			=> 'mit einem Gemüsebratling - 100% vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/veggiepatty-sm.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/veggiepatty-sm.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),


			array (
				'id' 					=> 30,
				'category_model_id'		=> 1,
				'title' 				=> 'Veggie Patty',
				'info'					=> 'footlong',
				'description'			=> 'mit einem Gemüsebratling - 100% vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/veggiepattyFtlng-ft.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/veggiepattyFtlng-ft.png',
				'price'					=> 5.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),



// Kids-Pak Subs ---------------

			array (
				'id' 					=> 31,
				'category_model_id'		=> 1,
				'title' 				=> 'Ham',
				'info'					=> 'Mini',
				'description'			=> 'mit leckerem Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/hamMini.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/hamMini.png',
				'price'					=> 0.00,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 32,
				'category_model_id'		=> 1,
				'title' 				=> 'Salami',
				'info'					=> 'Mini',
				'description'			=> 'mit Salami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/salamiMini.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/salamiMini.png',
				'price'					=> 0.00,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 33,
				'category_model_id'		=> 1,
				'title' 				=> 'Tuna',
				'info'					=> 'Mini',
				'description'			=> 'Thunfischcreme mit Lite-Mayonnaise, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/tunaMini.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/tunaMini.png',
				'price'					=> 0.00,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 34,
				'category_model_id'		=> 1,
				'title' 				=> 'Veggie Delite',
				'info'					=> 'Mini',
				'description'			=> 'rein vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/veggiedeliteMini.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/veggiedeliteMini.png',
				'price'					=> 0.00,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 35,
				'category_model_id'		=> 1,
				'title' 				=> 'Roasted Chicken Breast',
				'info'					=> 'Mini',
				'description'			=> 'mit geröstetem Hähnchenbrustfilet, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/subs/roastedchickenbreastMini.png',
				'largeImage'			=> 'img/static/articles/largeimages/subs/roastedchickenbreastMini.png',
				'price'					=> 0.00,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

// WRAPS -----------------------
// -----------------------------


			array (
				'id' 					=> 36,
				'category_model_id'		=> 2,
				'title' 				=> 'BBQ Rib',
				'info'					=> '',
				'description'			=> 'BBQ Rib-Hacksteak mit rauchiger BBQ Sauce, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 37,
				'category_model_id'		=> 2,
				'title' 				=> 'Chicken Fajita',
				'info'					=> '',
				'description'			=> 'mit würzigen Hähnchenbruststreifen, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 38,
				'category_model_id'		=> 2,
				'title' 				=> 'Chicken Teriyaki',
				'info'					=> '',
				'description'			=> 'mit süß-sauren Hähnchenbruststreifen in einer Teriyaki-Marinade, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 39,
				'category_model_id' 	=> 2,
				'title' 				=> 'Ham',
				'info'					=> '',
				'description'			=> 'mit leckerem Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 40,
				'category_model_id'		=> 2,
				'title' 				=> 'Italian B.M.T.',
				'info'					=> '',
				'description'			=> 'mit leckerem Hinterschinken, Salami, Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),	

			array (
				'id' 					=> 41,
				'category_model_id'		=> 2,
				'title' 				=> 'Roasted Chicken Breast',
				'info'					=> '',
				'description'			=> 'mit geröstetem Hähnchenbrustfilet, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 42,
				'category_model_id' 	=> 2,
				'title' 				=> 'Salami',
				'info'					=> '',
				'description'			=> 'mit Salami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),	

			array (
				'id' 					=> 43,
				'category_model_id' 	=> 2,
				'title' 				=> 'Spicy Italian',
				'info'					=> '',
				'description'			=> 'mit Salami und Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 44,
				'category_model_id' 	=> 2,
				'title' 				=> 'Steak & Cheese',
				'info'					=> '',
				'description'			=> 'mit zartem Steakfleisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),	

			array (
				'id' 					=> 45,
				'category_model_id' 	=> 2,
				'title' 				=> 'Tuna',
				'info'					=> '',
				'description'			=> 'Thunfischcreme mit Lite-Mayonnaise, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 46,
				'category_model_id' 	=> 2,
				'title' 				=> 'Turkey',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 47,
				'category_model_id' 	=> 2,
				'title' 				=> 'Turkey & Ham',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust und Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 48,
				'category_model_id' 	=> 2,
				'title' 				=> 'Turkey, Ham & Bacon Melt',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust, Hinterschinken und knusprigem Bacon, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 49,
				'category_model_id' 	=> 2,
				'title' 				=> 'Veggie Delite',
				'info'					=> '',
				'description'			=> 'rein vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 50,
				'category_model_id'		=> 2,
				'title' 				=> 'Veggie Patty',
				'info'					=> '',
				'description'			=> 'mit einem Gemüsebratling - 100% vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/wraps/wrap.png',
				'largeImage'			=> 'img/static/articles/largeimages/wraps/wrap-w.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),


// SALATE ----------------------
// -----------------------------


			array (
				'id' 					=> 51,
				'category_model_id'		=> 3,
				'title' 				=> 'BBQ Rib',
				'info'					=> '',
				'description'			=> 'BBQ Rib-Hacksteak mit rauchiger BBQ Sauce, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 52,
				'category_model_id'		=> 3,
				'title' 				=> 'Chicken Fajita',
				'info'					=> '',
				'description'			=> 'mit würzigen Hähnchenbruststreifen, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 53,
				'category_model_id'		=> 3,
				'title' 				=> 'Chicken Teriyaki',
				'info'					=> '',
				'description'			=> 'mit süß-sauren Hähnchenbruststreifen in einer Teriyaki-Marinade, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 54,
				'category_model_id' 	=> 3,
				'title' 				=> 'Ham',
				'info'					=> '',
				'description'			=> 'mit leckerem Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 55,
				'category_model_id'		=> 3,
				'title' 				=> 'Italian B.M.T.',
				'info'					=> '',
				'description'			=> 'mit leckerem Hinterschinken, Salami, Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 56,
				'category_model_id'		=> 3,
				'title' 				=> 'Roasted Chicken Breast',
				'info'					=> '',
				'description'			=> 'mit geröstetem Hähnchenbrustfilet, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 57,
				'category_model_id' 	=> 3,
				'title' 				=> 'Salami',
				'info'					=> '',
				'description'			=> 'mit Salami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 58,
				'category_model_id' 	=> 3,
				'title' 				=> 'Spicy Italian',
				'info'					=> '',
				'description'			=> 'mit Salami und Peperonisalami, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 59,
				'category_model_id' 	=> 3,
				'title' 				=> 'Steak & Cheese',
				'info'					=> '',
				'description'			=> 'mit zartem Steakfleisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 4.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 60,
				'category_model_id' 	=> 3,
				'title' 				=> 'Tuna',
				'info'					=> '',
				'description'			=> 'Thunfischcreme mit Lite-Mayonnaise, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),	

			array (
				'id' 					=> 61,
				'category_model_id' 	=> 3,
				'title' 				=> 'Turkey',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),	

			array (
				'id' 					=> 62,
				'category_model_id' 	=> 3,
				'title' 				=> 'Turkey & Ham',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust und Hinterschinken, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 63,
				'category_model_id' 	=> 3,
				'title' 				=> 'Turkey, Ham & Bacon Melt',
				'info'					=> '',
				'description'			=> 'mit Truthahnbrust, Hinterschinken und knusprigem Bacon, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 64,
				'category_model_id' 	=> 3,
				'title' 				=> 'Veggie Delite',
				'info'					=> '',
				'description'			=> 'rein vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.49,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),

			array (
				'id' 					=> 65,
				'category_model_id'		=> 3,
				'title' 				=> 'Veggie Patty',
				'info'					=> '',
				'description'			=> 'mit einem Gemüsebratling - 100% vegetarisch, Gemüse und Käse nach Wahl',
				'smallImage'			=> 'img/static/articles/smallimages/salads/salat.png',
				'largeImage'			=> 'img/static/articles/largeimages/salads/salat-s.png',
				'price'					=> 3.99,
				'deposit'				=> 0.00,
				'allowsIngredients'		=> true,
				'allowsDeposit'			=> false,
				'allowsMenuUpgrades'	=> true,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array(6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41)
				),


			// COOKIES ---------------------
			// -----------------------------


			array (
				'id' 					=> 66,
				'category_model_id'		=> 4,
				'title' 				=> 'Chocolate Chip',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit Vollmilchschokostücken',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/chocolatechip.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/chocolatechip-cdm.png',
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
				'id' 					=> 67,
				'category_model_id'		=> 4,
				'title' 				=> 'Chocolate Chip Rainbow Candy',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit Vollmilchschokostücken und Smarties',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/rainbowcandy.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/rainbowcandy-cdm.png',
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
				'id' 					=> 68,
				'category_model_id'		=> 4,
				'title' 				=> 'Double Chocolate Chip',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit weißen Schokoladenstücken',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/doublechocolatechip.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/doublechocolatechip-cdm.png',
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
				'id' 					=> 69,
				'category_model_id'		=> 4,
				'title' 				=> 'White Chip Macadamia Nut',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit weißen Macadamia Nüssen',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/macadamianut.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/macadamianut-cdm.png',
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
				'id' 					=> 70,
				'category_model_id'		=> 4,
				'title' 				=> 'Peanut Butter',
				'info'					=> '',
				'description'			=> 'Subway Cookie mit weißen Macadamia Nüssen',
				'smallImage'			=> 'img/static/articles/smallimages/cookies/peanutbutter.png',
				'largeImage'			=> 'img/static/articles/largeimages/cookies/peanutbutter-cdm.png',
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
				'id' 					=> 71,
				'category_model_id'		=> 4,
				'title' 				=> 'Milka Schoko-Muffin',
				'info'					=> '',
				'description'			=> 'leckerer Schoko-Muffin mit Milka-Alpenmilchschokolade',
				'smallImage'			=> 'img/static/articles/smallimages/muffins/milkamuffin.png',
				'largeImage'			=> 'img/static/articles/largeimages/muffins/milkamuffin-cdm.png',
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
				'id' 					=> 72,
				'category_model_id'		=> 4,
				'title' 				=> 'Deep Blueberry',
				'info'					=> '',
				'description'			=> 'Muffin mit Blaubeeren',
				'smallImage'			=> 'img/static/articles/smallimages/muffins/milkamuffin.png',
				'largeImage'			=> 'img/static/articles/largeimages/muffins/milkamuffin-cdm.png',
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
				'id' 					=> 73,
				'category_model_id'		=> 4,
				'title' 				=> 'Rich Chocolate Muffin',
				'info'					=> '',
				'description'			=> 'Schokoladenmuffin',
				'smallImage'			=> 'img/static/articles/smallimages/muffins/milkamuffin.png',
				'largeImage'			=> 'img/static/articles/largeimages/muffins/milkamuffin-cdm.png',
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
				'id' 					=> 74,
				'category_model_id'		=> 4,
				'title' 				=> 'Milka Schoko-Donut',
				'info'					=> '',
				'description'			=> 'leckerer Schoko-Donut mit Milka-Alpenmilchschokolade',
				'smallImage'			=> 'img/static/articles/smallimages/donuts/milkadonut.png',
				'largeImage'			=> 'img/static/articles/largeimages/donuts/milkadonut-cdm.png',
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
				'id' 					=> 75,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Paprika',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Paprika. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/laysclassic.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/laysclassic-c.png',
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
				'id' 					=> 76,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Salt & Vinegar',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Salt & Vinegar. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/layssaltvinegar.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/layssaltvinegar-c.png',
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
				'id' 					=> 77,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Cheese & Onion',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Cheese & Onion. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/laysclassic.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/laysclassic-c.png',
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
				'id' 					=> 78,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Salted',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Gesalzen. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/laysclassic.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/laysclassic-c.png',
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
				'id' 					=> 79,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Barbecue',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Barbecue. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/laysbarbecue.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/laysbarbecue-c.png',
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
				'id' 					=> 80,
				'category_model_id'		=> 4,
				'title' 				=> 'Lays Chips Sourcream & Onion',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Sourcream & Onion. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/layssourcreamonion.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/layssourcreamonion-c.png',
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
				'id' 					=> 81,
				'category_model_id'		=> 4,
				'title' 				=> 'Doritos Nacho Cheese',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Doritos Nacho Cheese. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/doritosnachocheese.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/doritosnachocheese-c.png',
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
				'id' 					=> 82,
				'category_model_id'		=> 4,
				'title' 				=> 'Doritos Sweet Chili Pepper',
				'info'					=> '',
				'description'			=> 'Geschmacksrichtung: Doritos Sweet Chili Pepper. Die legendären Chips aus Texas USA: Lays * Food for the fun of it *.',
				'smallImage'			=> 'img/static/articles/smallimages/chips/doritosnachocheese.png',
				'largeImage'			=> 'img/static/articles/largeimages/chips/doritosnachocheese-c.png',
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
				'id' 					=> 83,
				'category_model_id'		=> 5,
				'title' 				=> 'Coca Cola',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/coke.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/coke-b.png',
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
				'id' 					=> 84,
				'category_model_id'		=> 5,
				'title' 				=> 'Coca Cola Light',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/cokelight.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/cokelight-b.png',
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
				'id' 					=> 85,
				'category_model_id'		=> 5,
				'title' 				=> 'Fanta',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/fanta.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/fanta-b.png',
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
				'id' 					=> 86,
				'category_model_id'		=> 5,
				'title' 				=> 'Sprite',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/sprite.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/sprite-b.png',
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
				'id' 					=> 87,
				'category_model_id'		=> 5,
				'title' 				=> 'Apfelschorle',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/apfelschorle.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/apfelschorle-b.png',
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
				'id' 					=> 88,
				'category_model_id'		=> 5,
				'title' 				=> 'Nestea Pfirsich',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/nesteapfirsich.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/nesteapfirsich-b.png',
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
				'id' 					=> 89,
				'category_model_id'		=> 5,
				'title' 				=> 'Nestea Zitrone',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/nesteazitrone.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/nesteazitrone-b.png',
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
				'id' 					=> 90,
				'category_model_id'		=> 5,
				'title' 				=> 'Apollinaris Classic',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/apoclassic.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/apoclassic-b.png',
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
				'id' 					=> 91,
				'category_model_id'		=> 5,
				'title' 				=> 'Apollinaris Medium',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/apomedium.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/apomedium-b.png',
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
				'id' 					=> 92,
				'category_model_id'		=> 5,
				'title' 				=> 'Vio Mineralwasser',
				'info'					=> '0.5l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/vio05.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/vio05-b.png',
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
				'id' 					=> 93,
				'category_model_id'		=> 5,
				'title' 				=> 'Vio Mineralwasser',
				'info'					=> '0.75l',
				'description'			=> '',
				'smallImage'			=> 'img/static/articles/smallimages/beverages/vio075.png',
				'largeImage'			=> 'img/static/articles/largeimages/beverages/vio075-b.png',
				'price'					=> 2.00,
				'deposit'				=> 0.25,
				'allowsIngredients'		=> false,
				'allowsDeposit'			=> true,
				'allowsMenuUpgrades'	=> false,
				'isPublished'			=> true,
				'buyed'					=> 0,
				'ingredient_model_ids'	=> array()
				)

			// CATERING --------------------
			// -----------------------------


			);
}

}