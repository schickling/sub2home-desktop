<?php

use App\Models\CategoryModel;

class CategoryModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$categories = $this->getData();

		foreach ($categories as $category) {
			$categoryModel = new CategoryModel($category);
			$categoryModel->save();
		}

	}


	private function getData()
	{
		return array (

			array (
				// 'id' 					=> 1,
				'order' 				=> 0,
				'title' 				=> 'Aktionen',
				'smallImage'			=> 'img/static/categories/smallimages/aktionen.png',
				'icon'					=> 'iPromotion'
				),

			array (
				// 'id' 					=> 2,
				'order' 				=> 1,
				'title' 				=> 'Subs',
				'smallImage'			=> 'img/static/categories/smallimages/sub.png',
				'icon'					=> 'iSub'
				),

			array (
				// 'id' 					=> 3,
				'order' 				=> 2,
				'title' 				=> 'Wraps',
				'smallImage'			=> 'img/static/categories/smallimages/wrap.png',
				'icon'					=> 'iWrap'
				),

			array (
				// 'id' 					=> 4,
				'order' 				=> 3,
				'title' 				=> 'Salate',
				'smallImage'			=> 'img/static/categories/smallimages/salat.png',
				'icon'					=> 'iSalad'
				),

			array (
				// 'id' 					=> 5,
				'order' 				=> 4,
				'title' 				=> 'Snacks',
				'smallImage'			=> 'img/static/categories/smallimages/snacks.png',
				'icon'					=> 'iSnacks'
				),

			array (
				// 'id' 					=> 6,
				'order' 				=> 5,
				'title' 				=> 'Getränke',
				'smallImage'			=> 'img/static/categories/smallimages/getraenk.png',
				'icon'					=> 'iBeverage'
				),

			array (
				// 'id' 					=> 7,
				'order' 				=> 6,
				'title' 				=> 'Catering',
				'smallImage'			=> 'img/static/categories/smallimages/catering.png',
				'icon'					=> 'iCatering'
				)
		);
	}
}