<?php

class Backend_Clients_Controller extends Backend_Controller {

	/**
	 * Constructor
	 */
	function __construct() {
		Asset::add('backend.clients', 'js/backend/clients.js', 'backbone');
		parent::__construct();
	}

	/**
	 * Returns a view of clients including their stores
	 * 
	 * @return object
	 */
	public function get_index()
	{
		$view = View::make('backend.clients');

		$original_clients = User::with('address')->where_role('client')->get();

		// initalizes clients array
		$num_original_clients = count($original_clients);
		$clients = array_fill(0, $num_original_clients, null);

		for ($i = 0; $i < $num_original_clients; $i++) {
			$clients[$i] = $this->client_to_array($original_clients[$i]);
		}

		$view->clients = json_encode($clients);

		return $view;
	}

	private function client_to_array($original_client) {
		$c = array();
		$oc = $original_client;

		// Id
		$c['id'] = $oc->id;

		// Calculations
		$c['total_turnover'] = $oc->total_turnover;
		$c['monthly_turnover'] = $oc->monthly_turnover;
		$c['total_orders'] = $oc->total_orders;
		$c['monthly_orders'] = $oc->monthly_orders;

		// Client number
		$c['number'] = $oc->number;

		// Address array
		$c['address'] = $oc->address->to_array();

		// Date
		if (is_string($oc->created_at)) {
			$oc->created_at = new DateTime($oc->created_at);
		}
		$c['created_at'] = $oc->created_at->format('d.m.Y');

		// Stores array
		$stores = $oc->stores;
		foreach ($stores as &$store) {
			$store->total_turnover = $store->total_turnover;
			$store->monthly_turnover = $store->monthly_turnover;
			$store->total_orders = $store->total_orders;
			$store->monthly_orders = $store->monthly_orders;

			$store->address = $store->address->to_array();

			$date = new DateTime($store->created_at);
			$store->created_at = $date->format('d.m.Y');

			$store->active = (bool) $store->active;
			$store->isOpen = (bool) $store->isOpen;

			$store = $store->attributes;
		}
		$c['stores'] = $stores;

		return $c;

	}

	/**
	 * Returns the json object of a new client
	 * 
	 * @return string
	 */
	public function post_create()
	{
		
		$client = new User(array(
			'role' => 'client',
			'number' => 0
			));
		$client->save();

		$address = new Address(array(
			'first_name' => 'Vorname',
			'last_name' => 'Nachname',
			'street' => 'Straße Hausnummer',
			'street_additional' => 'Zusatz',
			'postal' => 0,
			'city' => 'Stadt',
			'phone' => 0,
			'email' => 'Emailadresse'
			));

		$client->address()->insert($address);
		$client->save();

		return json_encode($this->client_to_array($client));
	}

	/**
	 * Removes a client and all of his stores
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$client_id = (int) URI::segment(3);
		$client = User::find($client_id);
		
		$client->delete();
	}

	/**
	 * Updates the clients password
	 * 
	 * @return string
	 */
	public function post_update_password()
	{
		
		$input = Input::all();
		$rules = array(
			'password'  => 'min:6|confirmed'
			);

		$validation = Validator::make($input, $rules);

		if ($validation->fails()) {

			return Response::make(json_encode($validation->errors), 400);

		} else {

			$client = User::find($input['id']);
			$client->password = Hash::make($input['password']);
			$client->save();

		}
	}

	/**
	 * Updates the client and his address
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$address_array = get_object_vars($input->address);

		$rules = array(
			'email'  => 'required|email|unique:users,email,' . $input->id
			);

		$validation = Validator::make($address_array, $rules);

		if ($validation->fails()) {

			return Response::make(json_encode($validation->errors), 400);

		} else {
			
			$address = Address::find($input->address->id);
			$address->fill($address_array);
			$address->save();

			$client_id = (int) URI::segment(3);

			$client = User::find($client_id);

			$client->number = $input->number;
			$client->email = $address->email;

			$client->save();
		}
	}

}