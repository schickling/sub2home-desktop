<?php

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
			$menuUpgradeModel = new MenuUpgradeModel($menuUpgrade);
			$menuUpgradeModel->save();
		}

	}


	private function getData()
	{
		return array (

			array (
				'id' 					=> 1,
				'title' 				=> 'Sparmenu',
				'description'			=> 'Sparmenu',
				'price'					=> 4.49,
				'isPublished'			=> true,
				'buyed'					=> 0
				)

			);
	}
}