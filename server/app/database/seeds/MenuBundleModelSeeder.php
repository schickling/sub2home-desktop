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
				'order'					=> 0,
				'title' 				=> 'Kids Pak',
				'description'			=> 'Kids Pak',
				'largeImage'			=> 'img/static/menubundles/largeimages/kidspak.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/kidspak.png',
				'price'					=> 4.49,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 2,
				'category_model_id'		=> 7,
				'order'					=> 0,
				'title' 				=> '24er Cookie-Platte',
				'description'			=> '24 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/cookieplatte-ctr.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/cookieplatte.png',
				'price'					=> 16.99,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 3,
				'category_model_id'		=> 7,
				'order'					=> 1,
				'title' 				=> '36er Cookie-Platte',
				'description'			=> '36 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/cookieplatte-ctr.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/cookieplatte.png',
				'price'					=> 19.99,
				'isPublished'			=> true
				),

			array (
				// 'id' 					=> 4,
				'category_model_id'		=> 7,
				'order'					=> 2,
				'title' 				=> '48er Cookie-Platte',
				'description'			=> '48 Cookies deiner Wahl',
				'largeImage'			=> 'img/static/menubundles/largeimages/cookieplatte-ctr.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/cookieplatte.png',
				'price'					=> 24.99,
				'isPublished'			=> true
				)

			);
	}
}