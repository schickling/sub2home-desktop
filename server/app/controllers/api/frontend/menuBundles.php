<?php

/**
* 
*/
class Api_MenuBundles_Controller extends Api_Controller
{

	public function get_index()
	{
        $this->checkStore();
        
		// fetch articles with custom fields
		$menu_bundles = Custom_Menu::left_join('menu_bundles', 'menu_bundles.id', '=', 'custom_menus.menu_bundle_id')
					->where('menu_bundles.published', '=', true)
					->where('custom_menus.store_id', '=', $this->store->id)
					->where('custom_menus.active', '=', false)
    				->get(array(
    					'menu_bundles.id',
    					'menu_bundles.title',
    					'menu_bundles.image',
    					'menu_bundles.order',
    					'menu_bundles.description',
    					'menu_bundles.category_id',
    					'custom_menus.price as customPrice',
    					'menu_bundles.price as originalPrice',
    					'custom_menus.hasOwnPrice'
    					));

    	// set real price and purge attributes
    	foreach ($menu_bundles as $menu_bundle) {
    		if ($menu_bundle->hasOwnPrice) {
    			$menu_bundle->price = (float) $menu_bundle->customPrice;
    		} else {
    			$menu_bundle->price = (float) $menu_bundle->originalPrice;
    		}
    		$menu_bundle->purge('hasOwnPrice');
    		$menu_bundle->purge('customPrice');
    		$menu_bundle->purge('originalPrice');
    	}

		return eloquent_to_json($menu_bundles);
	}



}