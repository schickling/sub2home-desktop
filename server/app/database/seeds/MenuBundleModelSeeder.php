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
				'title' 				=> 'Kids Pak',
				'description'			=> 'Kids Pak',
				'largeImage'			=> 'img/static/menubundles/largeimages/kidspak.png',
				'smallImage'			=> 'img/static/menubundles/smallimages/kidspak.png',
				'price'					=> 4.49,
				'isPublished'			=> true
				)


			);
	}
}