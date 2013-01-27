<?php

/**
* 
*/
class Api_DeliveryTimes_Controller extends Api_Controller
{

	public function get_index()
	{
		$this->checkStore();

		return eloquent_to_json($this->store->delivery_times);
	}

	public function post_create()
	{
		$this->checkStore();

		$input = Input::json();
		
		$delivery_time = new Delivery_Time(array(
			'store_id' => $this->store->id,
			'day_of_week' => $input->day_of_week,
			'start_minutes' => 0,
			'end_minutes' => 60
			));

		$delivery_time->save();

		return eloquent_to_json($delivery_time);
	}

	public function put_update()
	{
		$input = Input::json();
		$id = URI::segment(5);

		$delivery_time = Delivery_Time::find($id);
		$this->checkOwner($delivery_time->store_id);

		$delivery_time->start_minutes = $input->start_minutes;
		$delivery_time->end_minutes = $input->end_minutes;

		$delivery_time->save();
	}

	public function delete_destroy()
	{
		$id = URI::segment(5);

		$delivery_time = Delivery_Time::find($id);
		$this->checkOwner($delivery_time->store_id);

		$delivery_time->delete();
	}	

}