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
				'id' 						=> 1,
				'menu_bundle_model_id'		=> 0,
				'menu_upgrade_model_id'		=> 1,
				'icon'						=> 'iBeverage',
				'smallImage'				=> '../../../img/static/categories/smallimages/getraenk.png',
				'largeImage'				=> '../../../img/static/categories/largeimages/getraenk.png',
				'placeholder'				=> 'pBeverage'
				),

			array (
				'id' 						=> 2,
				'menu_bundle_model_id'		=> 0,
				'menu_upgrade_model_id'		=> 1,
				'icon'						=> 'iSnacks',
				'smallImage'				=> '../../../img/static/categories/smallimages/snacks.png',
				'largeImage'				=> '../../../img/static/categories/largeimages/snacks.png',
				'placeholder'				=> 'pSnacks'
				),

			// Kids Pak --------------------
			// -----------------------------

			array ( // sub
				'id' 						=> 3,
				'menu_bundle_model_id'		=> 1,
				'menu_upgrade_model_id'		=> 0,
				'icon'						=> 'iStuff',
				'smallImage'				=> '../../../img/static/categories/smallimages/getraenk.png',
				'largeImage'				=> '../../../img/static/categories/largeimages/getraenk.png',
				'placeholder'				=> 'pBeverage'
				),

			array ( // drink
				'id' 						=> 4,
				'menu_bundle_model_id'		=> 1,
				'menu_upgrade_model_id'		=> 0,
				'icon'						=> 'iStuff',
				'smallImage'				=> '../../../img/static/categories/smallimages/getraenk.png',
				'largeImage'				=> '../../../img/static/categories/largeimages/getraenk.png',
				'placeholder'				=> 'pBeverage'
				),

			array ( // cookie
				'id' 						=> 5,
				'menu_bundle_model_id'		=> 1,
				'menu_upgrade_model_id'		=> 0,
				'icon'						=> 'iStuff',
				'smallImage'				=> '../../../img/static/categories/smallimages/getraenk.png',
				'largeImage'				=> '../../../img/static/categories/largeimages/getraenk.png',
				'placeholder'				=> 'pBeverage'
				)

	);
}
}