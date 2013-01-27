<?php

class Backend_Categories_Controller extends Backend_Controller {

	/**
	 * Constructor
	 */
	function __construct() {
		Asset::add('backend.categories', 'js/backend/categories.js', 'backbone');
		parent::__construct();
	}

	/**
	 * Returns a view of all ingredients
	 * 
	 * @return object
	 */
	public function get_index()
	{
		$view = View::make('backend.categories');

		$categories = Category::with('proxyitems', 'proxyitems.articles', 'proxyitems.menu_bundles')
							->order_by('order')
							->get();

		foreach ($categories as $category) {
			$category->num_items = $category->proxyitems()->count();
			$category->order = (int) $category->order;

			foreach ($category->proxyitems as $proxyitem) {
				$proxyitem->title = $proxyitem->title;
				$proxyitem->order = (int) $proxyitem->order;
			}
		}

		$view->categories = eloquent_to_json($categories);

		return $view;
	}

	public function post_create()
	{
		
		$input = Input::json();

		$category = new Category(array(
			'title' => 'Neue Kategorie'
			));

		$category->save();

		$category->num_items = 0;
		$category->order = (int) $category->order;

		return eloquent_to_json($category);
	}

	/**
	 * Removes an ingredient and the ingredients belonging to articles
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$category_id = (int) URI::segment(3);
		$category = Category::find($category_id);

		$category->delete();
	}

	/**
	 * Updates an ingredient field
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$category_id = (int) URI::segment(3);
		$category = Category::find($category_id);

		$category->title = $input->title;
		$category->order = $input->order;

		$category->save();
	}

}