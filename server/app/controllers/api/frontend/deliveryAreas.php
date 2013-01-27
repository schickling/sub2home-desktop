<?php

/**
* 
*/
class Api_DeliveryAreas_Controller extends Api_Controller
{

	public function get_index()
	{
		$this->checkStore();
		
		$delivery_areas = $this->store->delivery_areas;

		foreach ($delivery_areas as $delivery_area) {
			$delivery_area->minimum_value = (float) $delivery_area->minimum_value;
		}

		return eloquent_to_json($delivery_areas);
	}

	public function post_create()
	{
		$this->checkStore();

		$delivery_area = new Delivery_Area(array(
			'store_id' => $this->store->id,
			'minimum_value' => 0.00,
			'minimum_duration' => 0,
			'description' => '',
			'postal' => (int) $this->store->address->postal
			));

		$delivery_area->save();

		return eloquent_to_json($delivery_area);
	}

	public function put_update()
	{
		$input = Input::json();
		$id = URI::segment(5);

		$delivery_area = Delivery_Area::find($id);
		$this->checkOwner($delivery_area->store_id);

		$delivery_area->minimum_duration = $input->minimum_duration;
		$delivery_area->minimum_value = $input->minimum_value;
		$delivery_area->postal = $input->postal;
		$delivery_area->description = $input->description;

		$delivery_area->save();
	}

	public function delete_destroy()
	{
		$id = URI::segment(5);

		$delivery_area = Delivery_Area::find($id);
		$this->checkOwner($delivery_area->store_id);

		$delivery_area->delete();
	}	

}