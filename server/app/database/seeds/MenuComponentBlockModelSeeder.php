<?php

use App\Models\MenuComponentBlockModel;

class MenuComponentBlockModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$menuComponentBlocks = $this->getData();

		foreach ($menuComponentBlocks as $menuComponentBlock) {
			$menuComponentBlockModel = new MenuComponentBlockModel($menuComponentBlock);
			$menuComponentBlockModel->save();
		}

	}


	private function getData()
	{
		return array (

			// Sparmenu --------------------
			// -----------------------------

			array (
				// 'id' 					=> 1,
				'menuModel_id'				=> 1,
				'menuModel_type'			=> 'App\\Models\\MenuUpgradeModel',
				'icon'						=> 'iBeverage',
				'smallImage'				=> '../../../img/static/categories/smallimages/getraenk.png',
				'largeImage'				=> '../../../img/static/categories/largeimages/getraenk.png',
				'placeholder'				=> 'pBeverage'
				),

			array (
				// 'id' 					=> 2,
				'menuModel_id'				=> 1,
				'menuModel_type'			=> 'App\\Models\\MenuUpgradeModel',
				'icon'						=> 'iSnacks',
				'smallImage'				=> '../../../img/static/categories/smallimages/snacks.png',
				'largeImage'				=> '../../../img/static/categories/largeimages/snacks.png',
				'placeholder'				=> 'pSnacks'
				),

			// Kids Pak --------------------
			// -----------------------------

			array ( // sub
				// 'id' 					=> 3,
				'menuModel_id'				=> 1,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iMiniSub',
				'smallImage'				=> '../../../img/static/categories/smallimages/kidspaksub.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // drink
				// 'id' 					=> 4,
				'menuModel_id'				=> 1,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iBeverage',
				'smallImage'				=> '../../../img/static/categories/smallimages/getraenk.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie
				// 'id' 					=> 5,
				'menuModel_id'				=> 1,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // toy
				// 'id' 					=> 6,
				'menuModel_id'				=> 1,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iToy',
				'smallImage'				=> '../../../img/static/categories/smallimages/toy.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),


			// 24er Cookie Platte ----------
			// -----------------------------

			array ( // cookie 1
				// 'id' 					=> 7,
				'menuModel_id'				=> 2,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 2 
				// 'id' 					=> 8,
				'menuModel_id'				=> 2,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 3
				// 'id' 					=> 9,
				'menuModel_id'				=> 2,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 4
				// 'id' 					=> 10,
				'menuModel_id'				=> 2,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			// 36er Cookie Platte ----------
			// -----------------------------

			array ( // cookie 1
				// 'id' 					=> 11,
				'menuModel_id'				=> 3,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 2 
				// 'id' 					=> 12,
				'menuModel_id'				=> 3,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 3
				// 'id' 					=> 13,
				'menuModel_id'				=> 3,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 4
				// 'id' 					=> 14,
				'menuModel_id'				=> 3,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),


			// 48er Cookie Platte ----------
			// -----------------------------

			array ( // cookie 1
				// 'id' 					=> 15,
				'menuModel_id'				=> 4,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 2 
				// 'id' 					=> 16,
				'menuModel_id'				=> 4,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 3
				// 'id' 					=> 17,
				'menuModel_id'				=> 4,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 4
				// 'id' 					=> 18,
				'menuModel_id'				=> 4,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			// 3er Cookie Box --------------
			// -----------------------------

			array ( // cookie 1
				// 'id' 					=> 19,
				'menuModel_id'				=> 5,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 2 
				// 'id' 					=> 20,
				'menuModel_id'				=> 5,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 3
				// 'id' 					=> 21,
				'menuModel_id'				=> 5,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),


			// 12er Cookie Box -------------
			// -----------------------------

			array ( // cookie 1
				// 'id' 					=> 22,
				'menuModel_id'				=> 6,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 2 
				// 'id' 					=> 23,
				'menuModel_id'				=> 6,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 3
				// 'id' 					=> 24,
				'menuModel_id'				=> 6,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 4
				// 'id' 					=> 25,
				'menuModel_id'				=> 6,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),


			// Kleines Eröffnungsangebot ---
			// -----------------------------

			array ( // Ftlng 1
				// 'id' 					=> 26,
				'menuModel_id'				=> 7,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iSub',
				'smallImage'				=> '../../../img/static/categories/smallimages/sub.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // Ftlng 2 
				// 'id' 					=> 27,
				'menuModel_id'				=> 7,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iSub',
				'smallImage'				=> '../../../img/static/categories/smallimages/sub.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 1
				// 'id' 					=> 28,
				'menuModel_id'				=> 7,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 2
				// 'id' 					=> 29,
				'menuModel_id'				=> 7,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),


			// Großes Eröffnungsangebot ----
			// -----------------------------

			array ( // Ftlng 1
				// 'id' 					=> 30,
				'menuModel_id'				=> 8,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iSub',
				'smallImage'				=> '../../../img/static/categories/smallimages/sub.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // Ftlng 2 
				// 'id' 					=> 31,
				'menuModel_id'				=> 8,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iSub',
				'smallImage'				=> '../../../img/static/categories/smallimages/sub.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // Ftlng 2 
				// 'id' 					=> 32,
				'menuModel_id'				=> 8,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iSub',
				'smallImage'				=> '../../../img/static/categories/smallimages/sub.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 1
				// 'id' 					=> 33,
				'menuModel_id'				=> 8,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 2
				// 'id' 					=> 34,
				'menuModel_id'				=> 8,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				),

			array ( // cookie 2
				// 'id' 					=> 35,
				'menuModel_id'				=> 8,
				'menuModel_type'			=> 'App\\Models\\MenuBundleModel',
				'icon'						=> 'iCookie',
				'smallImage'				=> '../../../img/static/categories/smallimages/cookie.png',
				'largeImage'				=> '',
				'placeholder'				=> ''
				)

	);
}
}