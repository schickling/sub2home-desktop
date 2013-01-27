<?php

/**
* 
*/
class Api_MenuUpgrades_Controller extends Api_Controller
{

	public function get_index()
	{
		// $this->checkStore();

		// $article_id = URI::segment(5);
		// $article = Article::with(array(
		// 	'menu_upgrades',
		// 	'menu_upgrades.menu_component_blocks',
		// 	'menu_upgrades.menu_component_blocks.menu_component_options',
		// 	'menu_upgrades.menu_component_blocks.menu_component_options.category',
		// 	'menu_upgrades.menu_component_blocks.menu_component_options.articles'
		// 	))->find($article_id);

		// $menu_upgrades = $article->menu_upgrades;

  //       // touch relationships
		// foreach ($menu_upgrades as $menu_upgrade) {
		// 	foreach ($menu_upgrade->menu_component_blocks as $menu_component_block) {
		// 		foreach ($menu_component_block->menu_component_options as $menu_component_option) {
		// 			$menu_component_option->category->articles = $menu_component_option->articles;
		// 			foreach ($menu_component_option->category->articles as $included_article) {
		// 				$included_article->purge('buyed');
		// 			}
		// 		}
		// 	}
		// }

		// return eloquent_to_json($menu_upgrades);
	}



}