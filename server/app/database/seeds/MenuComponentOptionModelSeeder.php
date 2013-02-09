<?php

class MenuComponentOptionModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$menuComponentOptions = $this->getData();

		foreach ($menuComponentOptions as $menuComponentOption) {
			$menuComponentOptionModel = new MenuComponentOptionModel($menuComponentOption);
			$menuComponentOptionModel->save();
		}

	}


	private function getData()
	{
		return array (

			// Sparmenu --------------------
			// -----------------------------

			array (
				'id'							=> 1,
				'menu_component_block_model_id'	=> 1,
				'category_model_id'				=> 5,
				'title'							=> 'Getränk',
				'icon'							=> 'iBeverage',
				'smallImage'					=> 'img/static/menucomponentoptions/smallimages/getraenk.png',
				'largeImage'					=> 'img/static/menucomponentoptions/largeimages/getraenk.png',
				'placeholder'					=> 'pBeverage'
				),

			array (
				'id'							=> 2,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'icon'							=> 'iCookie',
				'smallImage'					=> 'img/static/menucomponentoptions/smallimages/cookie.png',
				'largeImage'					=> 'img/static/menucomponentoptions/largeimages/cookie.png',
				'placeholder'					=> 'pCookie'
				),

			array (
				'id'							=> 3,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Chips',
				'icon'							=> 'iChips',
				'smallImage'					=> 'img/static/menucomponentoptions/smallimages/chips.png',
				'largeImage'					=> 'img/static/menucomponentoptions/largeimages/chips.png',
				'placeholder'					=> 'pChips'
				),


			// Kids Pak --------------------
			// -----------------------------


			array (
				'id'							=> 4,
				'menu_component_block_model_id'	=> 3,
				'category_model_id'				=> 1,
				'title'							=> 'Sub',
				'icon'							=> 'iSub',
				'smallImage'					=> 'img/static/menucomponentoptions/smallimages/sub.png',
				'largeImage'					=> 'img/static/menucomponentoptions/largeimages/sub.png',
				'placeholder'					=> 'pSub'
				),

			array (
				'id'							=> 5,
				'menu_component_block_model_id'	=> 4,
				'category_model_id'				=> 5,
				'title'							=> 'Getränk',
				'icon'							=> 'iBeverage',
				'smallImage'					=> 'img/static/menucomponentoptions/smallimages/getraenk.png',
				'largeImage'					=> 'img/static/menucomponentoptions/largeimages/getraenk.png',
				'placeholder'					=> 'pBeverage'
				),

			array (
				'id'							=> 6,
				'menu_component_block_model_id'	=> 5,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'icon'							=> 'iCookie',
				'smallImage'					=> 'img/static/menucomponentoptions/smallimages/cookie.png',
				'largeImage'					=> 'img/static/menucomponentoptions/largeimages/cookie.png',
				'placeholder'					=> 'pCookie'
				)

			);
}
}