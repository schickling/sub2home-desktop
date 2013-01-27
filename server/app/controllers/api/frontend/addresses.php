<?php

/**
* 
*/
class Api_Addresses_Controller extends Api_Controller
{

	public function get_show()
	{
		$this->checkStore();
		return eloquent_to_json($this->store->address);
	}

	public function put_update()
	{
		$input = Input::json();

		$this->checkStore();
		$address = $this->store->address;

		$address->street = $input->street;
		$address->postal = $input->postal;
		$address->city = $input->city;
		$address->phone = $input->phone;
		$address->email = $input->email;

		$address->save();
	}

	

}