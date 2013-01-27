<?php

class Backend_Menu_Component_Blocks_Controller extends Backend_Controller {

	/**
	 * Creates an menu_component_block
	 * 
	 * @return string
	 */
	public function post_create()
	{
		$input = Input::json();

		$menu_component_block = new Menu_Component_Block(array(
				'menu_bundle_id' => $input->menu_bundle_id,
				'menu_upgrade_id' => $input->menu_upgrade_id,
			));

		$menu_component_block->save();
		$menu_component_block->menu_component_options = $menu_component_block->menu_component_options;

		return eloquent_to_json($menu_component_block);
	}

	/**
	 * Removes an menu_component_block
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$menu_component_block_id = (int) URI::segment(5);
		$menu_component_block = Menu_Component_Block::find($menu_component_block_id);

		$menu_component_block->delete();
	}

}