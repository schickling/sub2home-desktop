<?php

class Backend_Menu_Component_Options_Controller extends Backend_Controller {

	/**
	 * Creates an menu_component_option
	 * 
	 * @return string
	 */
	public function post_create()
	{	
		$input = Input::json();

		$menu_component_option = new Menu_Component_Option(array(
				'menu_component_block_id' => $input->menu_component_block_id,
				'category_id' => $input->category_id
			));
		$menu_component_option->save();

		// fetch relationships and linked attributes
		$menu_component_option->articles = $menu_component_option->articles;
		$menu_component_option->available_articles = $menu_component_option->available_articles;
		$menu_component_option->title = $menu_component_option->title;

		return $menu_component_option->toJSON(array(
			'id',
			'category_id',
			'title',
			'articles' => array(
				'id',
				'title'
				),
			'available_articles' => array(
				'id',
				'title'
				)
			));
	}

	/**
	 * Updates a menu_component_option
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$menu_component_option_id = (int) URI::segment(5);
		$menu_component_option = Menu_Component_Option::find($menu_component_option_id);

		// remove missing articles
		foreach ($menu_component_option->articles as $article) {
			if (!$this->has_article($input->articles, $article)) {
				$menu_component_option->articles()->detach($article->id);
			}
		}

		// add new articles
		foreach ($input->articles as $article) {
			if (!$this->has_article($menu_component_option->articles, $article)) {
				$menu_component_option->articles()->attach($article->id);
			}
		}

		$menu_component_option->save();
	}

	/**
	 * Removes an menu_component_option
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$menu_component_option_id = (int) URI::segment(5);
		$menu_component_option = Menu_Component_Option::find($menu_component_option_id);

		$menu_component_option->delete();
	}

	private function has_article($articles, $check_article)
	{
		foreach ($articles as $article) {
			if ($article->id == $check_article->id) {
				return true;
			}
		}
		return false;
	}

}