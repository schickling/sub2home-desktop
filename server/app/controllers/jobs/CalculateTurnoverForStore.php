<?php namespace App\Controllers\Jobs;

use Cache;

class CalculateTurnoverForStore {

    public function fire($job, $data)
    {

    	$orderModel = $data['orderModel'];


        Cache::put($orderModel->id, 'jo', 1);
        var_dump($data);
        $job->delete();
    }

    public function run()
	{

		$last_summed_order_id = Cache::get('last_summed_order_id');

		$num_orders = Order::where_status(true)
						->where('id', '>', $last_summed_order_id)
						->count();


		// Initalize data array
		$classes = array('Article', 'Custom_Article', 'Menu_Upgrade', 'Menu_Bundle', 'Custom_Menu', 'Store');
		$this->data = array_fill_keys($classes, array());

		// Loop through all orders
		for ($i = 0; $i < $num_orders; $i += $this->items_per_loop) {
			$orders = Order::where_status(true)
							->where('id', '>', $last_summed_order_id)
							->take($this->items_per_loop)
							->get();

			foreach ($orders as $order) {

				// Store total turnover
				$this->increase_value('Store', (int) $order->store_id, (float) $order->total);

				// Iterate over all ordered articles
				foreach ($order->all_ordered_articles as $ordered_article) {
					// how often the article was buyed
					$article = $ordered_article->article;
					$this->increase_value('Article', (int) $article->id, (int) $ordered_article->amount);

					// how often the custom article was buyed
					$custom_article = $article->returnCustom_article($order->store_id);
					if ($custom_article) {
						$this->increase_value('Custom_Article', (int) $custom_article->id, (int) $ordered_article->amount);
					}
				}

				// Iterate over all ordered menus
				foreach ($order->ordered_menus as $ordered_menu) {
					// how often the menu was buyed
					$menu = $ordered_menu->menu;
					$this->increase_value(get_class($menu), (int) $menu->id, (int) $ordered_menu->amount);

					// how often the custom menu was buyed
					$custom_menu = $menu->returnCustom_menu($order->store_id);
					if ($custom_menu) {
						$this->increase_value('Custom_Menu', (int) $custom_menu->id, (int) $ordered_menu->amount);
					}
				}

				// Set last order id
				$last_summed_order_id = $order->id;
			}
		}

		// Update models
		foreach ($this->data as $class => $models) {
			// if model are stores
			if ($class == 'Store') {
				foreach ($models as $id => $total_turnover) {
					$item = Store::find($id);
					$item->total_turnover = $total_turnover;
					$item->save();
				}
			// if model are articles, menus...
			} else {
				foreach ($models as $id => $buyed) {
					$item = $class::find($id);
					$item->buyed = $buyed;
					$item->save();
				}
			}
		}

		Cache::forever('last_summed_order_id', $last_summed_order_id);
	}

}