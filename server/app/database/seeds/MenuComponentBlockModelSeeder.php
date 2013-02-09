<?php

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
				'menu_upgrade_model_id'		=> 1
				),

			array (
				'id' 						=> 2,
				'menu_bundle_model_id'		=> 0,
				'menu_upgrade_model_id'		=> 1
				),

// Kids Pak --------------------
// -----------------------------

	array ( // sub
		'id' 						=> 3,
		'menu_bundle_model_id'		=> 1,
		'menu_upgrade_model_id'		=> 0
		),

	array ( // drink
		'id' 						=> 4,
		'menu_bundle_model_id'		=> 1,
		'menu_upgrade_model_id'		=> 0
		),

	array ( // cookie
		'id' 						=> 5,
		'menu_bundle_model_id'		=> 1,
		'menu_upgrade_model_id'		=> 0
		)

	// array ( // toy
	// 	'id' 						=> 6,
	// 	'menu_bundle_model_id'		=> 1,
	// 	'menu_upgrade_model_id'		=> 0
	// 	)

	);
	}
}