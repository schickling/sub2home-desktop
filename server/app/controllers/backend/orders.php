<?php

class Backend_Orders_Controller extends Backend_Controller {

	/**
	 * Constructor
	 */
	function __construct() {
		Asset::add('backend.clients', 'js/backend/orders.js', 'backbone');
		parent::__construct();
	}

	/**
	 * Returns a view of all orders
	 * 
	 * @return object
	 */
	public function get_index()
	{
		$view = View::make('backend.orders');

		$view->orders = $this->get_orders(0);

		return $view;
	}

	/**
	 * Returns 50 orders beginning with offset as json object
	 * 
	 * @param  int $offset
	 * @return string
	 */
	public function get_orders ($offset) {
		$orders = Order::order_by('id', 'desc')->skip($offset)->take(50)->get();

		foreach ($orders as $order) {
			$this->take_required_attributes($order);
		}

		return eloquent_to_json($orders);
	}

	private function take_required_attributes($order) {
		// Id
		$order->id = (int) $order->id;

		// Store
		$order->store = $order->store;

			// Number of articles
		$number = $order->ordered_articles()->count() + $order->ordered_menus()->count();
		$order->num_articles = $number;

			// Status
		$order->status = (bool) $order->status;

			// Total
		$order->total = (float) $order->total;

			// Credit
		$order->credit = (int) $order->credit;

			// Date
		$date = new DateTime($order->created_at);
		$order->created_at = $date->format('d.m.Y');
	}

	// public function get_ordered_items($order_id)
	// {
	// 	$order = Order::find($order_id);
	// 	$ordered_items = array(
	// 		'menus' => $order->ordered_menus,
	// 		'articles' => $order->ordered_articles
	// 		);

	// 	// Prepare menus
	// 	foreach ($ordered_items['menus'] as $ordered_menu) {
	// 		$ordered_menu->ordered_articles = $ordered_menu->ordered_articles;
	// 		foreach ($ordered_menu->ordered_articles as $ordered_article) {
	// 			$ordered_article->ingredients = $ordered_article->ingredients;
	// 		}
	// 	}

	// 	// Prepare individual articles
	// 	foreach ($ordered_items['articles'] as &$ordered_article) {
	// 		$ordered_article->ingredients = $ordered_article->ingredients;
	// 	}

	// 	$json_string = sprintf('{menus:%s,articles:%s}',
	// 		eloquent_to_json($ordered_items['menus']),
	// 		eloquent_to_json($ordered_items['articles'])
	// 		);

	// 	return $json_string;
	// }
	
	public function get_search($keyword)
	{
		$store = Store::where_number((int) $keyword)->first();

		if ($store) {
			$store_id = $store->id;
		} else {
			$store_id = 0;
		}

		$results = Order::where_id($keyword)
						->or_where('store_id', 'LIKE', '%' . $store_id)
						->order_by('id', 'desc')
						->take(100)->get();

		foreach ($results as $order) {
			$this->take_required_attributes($order);
		}

		return eloquent_to_json($results);
	}

	/**
	 * Returns the json object of the new credit
	 * 
	 * @return string
	 */
	public function post_create()
	{
		
		$input = Input::json();

		$order = new Order(array(
			'credit' => (int) $input->credit,
			'store_id' => (int) $input->store_id,
			'total' => -(abs($input->total)),
			'payment' => 'credit',
			'status' => true
			));

		$order->save();

		$order->num_articles = 0;
		$order->store = $order->store;
		$order->created_at = $order->created_at->format('d.m.Y');

		return eloquent_to_json($order);
	}

	/**
	 * Removes an credit
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$order_id = (int) URI::segment(3);
		$order = Order::find($order_id);
		
		$order->delete();
	}

}