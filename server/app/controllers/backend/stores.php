<?php

class Backend_Stores_Controller extends Backend_Controller {

	/**
	 * Returns the json object of a new store
	 * 
	 * @return string
	 */
	public function post_create()
	{
		
		$input = Input::json();

		$input_array = get_object_vars($input);

		// Validate
		$rules = array(
			'number' => 'required|unique:stores|integer'
			);

		$validation = Validator::make($input_array, $rules);

		if ($validation->fails()) {
			
			return Response::make(json_encode($validation->errors), 400);

		} else {

			$store = new Store(array(
				'number' => (int) $input->number,
				'user_id' => (int) $input->user_id,
				'active' => false,
				'title' => 'Store ' . $input->number
				));

			$store->save();

			$store_array = array(
				'address' => $store->address->to_array(),
				'title' => $store->title,
				'id' => $store->id,
				'active' => $store->active,
				'total_turnover' => $store->total_turnover,
				'monthly_turnover' => $store->monthly_turnover,
				'total_orders' => $store->total_orders,
				'monthly_orders' => $store->monthly_orders,
				'created_at' => $store->created_at->format('d.m.Y')
				);

			return json_encode($store_array);
		}
	}

	/**
	 * Removes a store
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$store_id = (int) URI::segment(3);
		$store = Store::find($store_id);

		$store->delete();
	}

	/**
	 * Updates a store
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$store_id = (int) URI::segment(3);
		$store = Store::find($store_id);

		$store->active = (bool) $input->active;
		$store->open = (bool) $input->open;
		$store->title = $input->title;
		$store->number = (int) $input->number;

		$store->save();

		return eloquent_to_json($store);
	}

}