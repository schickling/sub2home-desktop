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
				'article_model_ids'				=> array(94, 95, 96, 97, 98, 99, 100, 101, 102, 103)
				),

			array (
				// 'id'							=> 2,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 5,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Chips',
				'article_model_ids'				=> array(86, 87, 88, 89, 90, 91, 92, 93, 93)
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
				'article_model_ids'				=> array(94, 95, 96, 97, 98, 99, 100, 101, 102, 103)
				),

			array (
				// 'id'							=> 6,
				'menu_component_block_model_id'	=> 5,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 7,
				'menu_component_block_model_id'	=> 6,
				'category_model_id'				=> 4,
				'title'							=> 'Toys',
				'article_model_ids'				=> array()
				),


			// 24er Cookie Platte ----------
			// -----------------------------


			array (
				// 'id'							=> 8,
				'menu_component_block_model_id'	=> 7,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 9,
				'menu_component_block_model_id'	=> 8,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 10,
				'menu_component_block_model_id'	=> 9,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 11,
				'menu_component_block_model_id'	=> 10,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),


			// 36er Cookie Platte ----------
			// -----------------------------


			array (
				// 'id'							=> 12,
				'menu_component_block_model_id'	=> 11,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 13,
				'menu_component_block_model_id'	=> 12,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 14,
				'menu_component_block_model_id'	=> 13,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 15,
				'menu_component_block_model_id'	=> 14,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),


			// 48er Cookie Platte ----------
			// -----------------------------


			array (
				// 'id'							=> 16,
				'menu_component_block_model_id'	=> 15,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 17,
				'menu_component_block_model_id'	=> 16,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 18,
				'menu_component_block_model_id'	=> 17,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 19,
				'menu_component_block_model_id'	=> 18,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),



			// 3er Cookie Box --------------
			// -----------------------------


			array (
				// 'id'							=> 20,
				'menu_component_block_model_id'	=> 19,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 21,
				'menu_component_block_model_id'	=> 20,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 22,
				'menu_component_block_model_id'	=> 21,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			// 12er Cookie Box --------------
			// -----------------------------


			array (
				// 'id'							=> 23,
				'menu_component_block_model_id'	=> 22,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(68, 71, 74, 77, 80)
				),

			array (
				// 'id'							=> 24,
				'menu_component_block_model_id'	=> 23,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(68, 71, 74, 77, 80)
				),

			array (
				// 'id'							=> 25,
				'menu_component_block_model_id'	=> 24,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(68, 71, 74, 77, 80)
				),

			array (
				// 'id'							=> 26,
				'menu_component_block_model_id'	=> 25,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(68, 71, 74, 77, 80)
				),


			// Kleines Eröffnungsangebot ---
			// -----------------------------


			array (
				// 'id'							=> 27,
				'menu_component_block_model_id'	=> 26,
				'category_model_id'				=> 1,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30)
				),

			array (
				// 'id'							=> 28,
				'menu_component_block_model_id'	=> 27,
				'category_model_id'				=> 1,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30)
				),

			array (
				// 'id'							=> 29,
				'menu_component_block_model_id'	=> 28,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			array (
				// 'id'							=> 30,
				'menu_component_block_model_id'	=> 29,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(66, 69, 72, 75, 78)
				),

			// Großes Eröffnungsangebot ----
			// -----------------------------


			array (
				// 'id'							=> 31,
				'menu_component_block_model_id'	=> 30,
				'category_model_id'				=> 1,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30)
				),

			array (
				// 'id'							=> 32,
				'menu_component_block_model_id'	=> 31,
				'category_model_id'				=> 1,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30)
				),

			array (
				// 'id'							=> 33,
				'menu_component_block_model_id'	=> 32,
				'category_model_id'				=> 1,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30)
				),

			array (
				// 'id'							=> 34,
				'menu_component_block_model_id'	=> 33,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(67, 70, 73, 76, 79)
				),

			array (
				// 'id'							=> 35,
				'menu_component_block_model_id'	=> 34,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(67, 70, 73, 76, 79)
				),

			array (
				// 'id'							=> 36,
				'menu_component_block_model_id'	=> 35,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(67, 70, 73, 76, 79)
				)

			);
}

}