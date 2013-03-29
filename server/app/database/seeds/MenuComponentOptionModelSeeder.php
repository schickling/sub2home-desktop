<?php

use App\Models\MenuComponentOptionModel;

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

			$article_model_ids = $menuComponentOption['article_model_ids'];
			unset($menuComponentOption['article_model_ids']);

			$menuComponentOptionModel = new MenuComponentOptionModel($menuComponentOption);
			$menuComponentOptionModel->save();

			foreach ($article_model_ids as $article_model_id) {
				$menuComponentOptionModel->menuComponentOptionArticlesCollection()->attach($article_model_id);
			}
		}

	}

	private function getData()
	{
		return array (

			// Sparmenu --------------------
			// -----------------------------

			array (
				// 'id'							=> 1,
				'menu_component_block_model_id'	=> 1,
				'category_model_id'				=> 5,
				'title'							=> 'Getränk',
				'article_model_ids'				=> array(83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93)
				),

			array (
				// 'id'							=> 2,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 3,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Muffins',
				'article_model_ids'				=> array(71, 72, 73)
				),

			array (
				// 'id'							=> 4,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Donuts',
				'article_model_ids'				=> array(74)
				),

			array (
				// 'id'							=> 5,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Chips',
				'article_model_ids'				=> array(75, 76, 77, 78, 79, 80, 81, 82)
				),

			// Kids Pak --------------------
			// -----------------------------


			array (
				// 'id'							=> 6,
				'menu_component_block_model_id'	=> 3,
				'category_model_id'				=> 1,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(31, 32, 33, 34, 35)
				),

			array (
				// 'id'							=> 7,
				'menu_component_block_model_id'	=> 4,
				'category_model_id'				=> 5,
				'title'							=> 'Getränk',
				'article_model_ids'				=> array(83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93)
				),

			array (
				// 'id'							=> 6,
				'menu_component_block_model_id'	=> 5,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 7,
				'menu_component_block_model_id'	=> 6,
				'category_model_id'				=> 4,
				'title'							=> 'Toy',
				'article_model_ids'				=> array()
				),


			// 24er Cookie Platte ----------
			// -----------------------------


			array (
				// 'id'							=> 8,
				'menu_component_block_model_id'	=> 7,
				'category_model_id'				=> 4,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 9,
				'menu_component_block_model_id'	=> 8,
				'category_model_id'				=> 4,
				'title'							=> 'Getränk',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 10,
				'menu_component_block_model_id'	=> 9,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 11,
				'menu_component_block_model_id'	=> 10,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),


			// 36er Cookie Platte ----------
			// -----------------------------


			array (
				// 'id'							=> 12,
				'menu_component_block_model_id'	=> 11,
				'category_model_id'				=> 4,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 13,
				'menu_component_block_model_id'	=> 12,
				'category_model_id'				=> 4,
				'title'							=> 'Getränk',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 14,
				'menu_component_block_model_id'	=> 13,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 15,
				'menu_component_block_model_id'	=> 14,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),


			// 48er Cookie Platte ----------
			// -----------------------------


			array (
				// 'id'							=> 16,
				'menu_component_block_model_id'	=> 15,
				'category_model_id'				=> 4,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 17,
				'menu_component_block_model_id'	=> 16,
				'category_model_id'				=> 4,
				'title'							=> 'Getränk',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 18,
				'menu_component_block_model_id'	=> 17,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 19,
				'menu_component_block_model_id'	=> 18,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 67, 68, 69, 70)
				)
			);
}

}