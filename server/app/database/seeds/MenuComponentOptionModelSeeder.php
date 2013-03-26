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
				'article_model_ids'				=> array(62, 63, 64, 65, 66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 2,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(46, 47, 48, 49)
				),

			array (
				// 'id'							=> 3,
				'menu_component_block_model_id'	=> 2,
				'category_model_id'				=> 4,
				'title'							=> 'Chips',
				'article_model_ids'				=> array(4, 55, 56, 57, 58, 59, 60, 61)
				),


			// Kids Pak --------------------
			// -----------------------------


			array (
				// 'id'							=> 4,
				'menu_component_block_model_id'	=> 3,
				'category_model_id'				=> 1,
				'title'							=> 'Sub',
				'article_model_ids'				=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)
				),

			array (
				// 'id'							=> 5,
				'menu_component_block_model_id'	=> 4,
				'category_model_id'				=> 5,
				'title'							=> 'Getränk',
				'article_model_ids'				=> array(62, 63, 64, 65, 66, 67, 68, 69, 70)
				),

			array (
				// 'id'							=> 6,
				'menu_component_block_model_id'	=> 5,
				'category_model_id'				=> 4,
				'title'							=> 'Cookie',
				'article_model_ids'				=> array(46, 47, 48, 49)
				)

			);
}

}