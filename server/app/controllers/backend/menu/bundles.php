<?php

class Backend_Menu_Bundles_Controller extends Backend_Menu_Base_Controller {

	/**
	 * Constructor
	 */
	function __construct() {
		parent::__construct();

		// Set category from URL
		$category_alias = URI::segment(4);
		$this->category = Category::where_alias($category_alias)->first();
	}

	/**
	 * Returns a view of all ingredients
	 * 
	 * @return object
	 */
	public function get_index($category_alias)
	{
		if ($this->category == null) {
			return Response::error('404');
		}

		$view = View::make('backend.menus');

		$menu_bundles = Menu_Bundle::where_category_id($this->category->id)->get();

		foreach ($menu_bundles as $menu_bundle) {

			// class name needed in js
			$menu_bundle->class_name = 'Menu_Bundle';

			// How often the menu_bundle was buyed
			$menu_bundle->buyed = (int) $menu_bundle->buyed;

			// get options
			foreach ($menu_bundle->menu_component_blocks as $menu_component_block) {
				foreach ($menu_component_block->menu_component_options as $option) {
					$option->title = $option->title;
					$option->articles = $option->articles;
					$option->all_articles = array_map(function($article) {
						return $article->attributes;
					}, $option->category->articles);
				}
			}

			// Price
			$menu_bundle->price = (float) $menu_bundle->price;

			// Prepare image urls
			if (!empty($menu_bundle->image)) {
				$menu_bundle->image_small = Menu_Base::$publicImageSmallPath . $menu_bundle->image;
				$menu_bundle->image_big = Menu_Base::$publicImageBigPath . $menu_bundle->image;
			}
		}

		$view->menus = eloquent_to_json($menu_bundles);

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
		if ($this->category == null) {
			return Response::error('404');
		}

		$menu_bundle = new Menu_Bundle(array(
				'title' => 'Neues Menu',
				'description' => 'Beschreibung',
				'price' => 0,
				'buyed' => 0,
				'category_id' => $this->category->id
			));

		$menu_bundle->save();

		$menu_bundle->menu_component_blocks = $menu_bundle->menu_component_blocks;

		return eloquent_to_json($menu_bundle);
	}

	/**
	 * Removes an ingredient and the ingredients belonging to articles
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$menu_bundle_id = (int) URI::segment(5);
		$menu_bundle = Menu_Bundle::find($menu_bundle_id);

		$menu_bundle->delete();
	}

	/**
	 * Updates an ingredient field
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$menu_bundle_id = (int) URI::segment(5);

		$menu_bundle = Menu_Bundle::find($menu_bundle_id);

		$menu_bundle->title = $input->title;
		$menu_bundle->price = $input->price;
		$menu_bundle->description = $input->description;

		$menu_bundle->save();
	}

}