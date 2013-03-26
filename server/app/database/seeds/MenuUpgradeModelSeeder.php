<?php

use App\Models\MenuUpgradeModel;

class MenuUpgradeModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$menuUpgrades = $this->getData();

		foreach ($menuUpgrades as $menuUpgrade) {

			$article_model_ids = $menuUpgrade['article_model_ids'];
			unset($menuUpgrade['article_model_ids']);

			$menuUpgradeModel = new MenuUpgradeModel($menuUpgrade);
			$menuUpgradeModel->save();

			foreach ($article_model_ids as $article_model_id) {
				$menuUpgradeModel->articlesCollection()->attach($article_model_id);
			}

		}

	}


	private function getData()
	{
		return array (

			array (
				// 'id' 					=> 1,
				'title' 				=> 'Sparmenu',
				'description'			=> 'Sparmenu',
				'price'					=> 2.00,
				'isPublished'			=> true,
				'article_model_ids'		=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
				)

			);
	}
}