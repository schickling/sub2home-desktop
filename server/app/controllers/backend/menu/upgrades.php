<?php

class Backend_Menu_Upgrades_Controller extends Backend_Menu_Base_Controller {

	/**
	 * Returns a view of all ingredients
	 * 
	 * @return object
	 */
	public function get_index()
	{

		$view = View::make('backend.menus');

		$menu_upgrades = Menu_Upgrade::all();

		foreach ($menu_upgrades as $menu_upgrade) {

			// class name needed in js
			$menu_upgrade->class_name = 'Menu_Upgrade';

			// How often the menu_upgrade was buyed
			$menu_upgrade->buyed = (int) $menu_upgrade->buyed;

			// get options
			foreach ($menu_upgrade->menu_component_blocks as $menu_component_block) {
				foreach ($menu_component_block->menu_component_options as $option) {
					$option->title = $option->title;
					$option->articles = $option->articles;
					$option->available_articles = $option->available_articles;
				}
			}

			// Price
			$menu_upgrade->price = (float) $menu_upgrade->price;

			// Prepare image urls
			if (!empty($menu_upgrade->image)) {
				$menu_upgrade->image_small = Menu_Base::$publicImageSmallPath . $menu_upgrade->image;
				$menu_upgrade->image_big = Menu_Base::$publicImageBigPath . $menu_upgrade->image;
			}
		}

		$view->menus = array_to_json($menu_upgrades, array(
			'id',
			'title',
			'description',
			'price',
			'buyed',
			'class_name',
			'menu_component_blocks' => array(
				'id',
				'menu_component_options' => array(
					'id',
					'title',
					'articles' => array(
						'id',
						'title'
						),
					'available_articles' => array(
						'id',
						'title'
						)
					)
				)
			));

		$categories = Category::all();

		$view->categories = $categories;

		return $view;
	}

	/**
	 * Creates a new menu
	 * 
	 * @return string
	 */
	public function post_create()
	{

		$menu_upgrade = new Menu_Upgrade(array(
				'title' => 'Neues Menu',
				'description' => 'Beschreibung',
				'price' => 0,
				'buyed' => 0
			));

		$menu_upgrade->save();

		$menu_upgrade->menu_component_blocks = $menu_upgrade->menu_component_blocks;

		return eloquent_to_json($menu_upgrade);
	}

	/**
	 * Removes an ingredient and the ingredients belonging to articles
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$menu_upgrade_id = (int) URI::segment(4);
		$menu_upgrade = Menu_Upgrade::find($menu_upgrade_id);

		$menu_upgrade->delete();
	}

	/**
	 * Updates an ingredient field
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$menu_upgrade_id = (int) URI::segment(4);

		$menu_upgrade = Menu_Upgrade::find($menu_upgrade_id);

		$menu_upgrade->title = $input->title;
		$menu_upgrade->price = $input->price;
		$menu_upgrade->description = $input->description;

		$menu_upgrade->save();
	}

}