<?php

use App\Models\MenuBundleModel;

class MenuBundleModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$menuBundles = $this->getData();

		foreach ($menuBundles as $menuBundle) {
			$menuBundleModel = new MenuBundleModel($menuBundle);
			$menuBundleModel->save();
		}

	}


	private function getData()
	{
		return array (

			array (
				// 'id' 					=> 1,
				'category_model_id'		=> 1,
				'order'					=> 2,
				'title' 				=> 'Kids Pak',
				'description'			=> 'Kids Pak',
				'largeImage'			=> 'img/static/menubundles/largeimages/kidspak.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/kidspak.png',
				'price'					=> 4.49,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 2,
				'category_model_id'		=> 1,
				'order'					=> 3,
				'title' 				=> '24er Cookie-Platte',
				'description'			=> '24 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/cookieplatte-ctr.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/cookieplatte.png',
				'price'					=> 16.99,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 3,
				'category_model_id'		=> 1,
				'order'					=> 4,
				'title' 				=> '36er Cookie-Platte',
				'description'			=> '36 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/cookieplatte-ctr.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/cookieplatte.png',
				'price'					=> 19.99,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 4,
				'category_model_id'		=> 1,
				'order'					=> 5,
				'title' 				=> '48er Cookie-Platte',
				'description'			=> '48 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/cookieplatte-ctr.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/cookieplatte.png',
				'price'					=> 24.99,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 5,
				'category_model_id'		=> 5,
				'order'					=> 0,
				'title' 				=> '3er Cookie-Box',
				'description'			=> '3 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/cookies3er-cdm.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/cookies3er-cdm.png',
				'price'					=> 2.19,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 6,
				'category_model_id'		=> 5,
				'order'					=> 1,
				'title' 				=> '12er Cookie-Box',
				'description'			=> '12 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/cookiebox-cdm.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/cookiebox-cdm.png',
				'price'					=> 5.19,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 7,
				'category_model_id'		=> 1,
				'order'					=> 0,
				'title' 				=> 'Kleines Eröffnungsangebot',
				'description'			=> '2 Footlong-Sandwiches & 2 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/eroeffnungKl.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/eroeffnungKl.png',
				'price'					=> 12.00,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 8,
				'category_model_id'		=> 1,
				'order'					=> 1,
				'title' 				=> 'Großes Eröffnungsangebot',
				'description'			=> '3 Footlong-Sandwiches & 6 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/eroeffnungGr.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/eroeffnungGr.png',
				'price'					=> 19.00,
				'isPublished'			=> true
				)
			);
	}
}