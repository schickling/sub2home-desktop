<?php

use Illuminate\Database\Migrations\Migration;

class PopulateTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		$this->populate();
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

	public function populate()
	{
		// AddressModel
		$ad1 = new AddressModel(array(
			'firstName' => 'Sebastian',
			'lastName' => 'Weigold',
			'street' => 'Maximilianstr 4',
			'streetAdditional' => 'Ums Eck',
			'postal' => 87700,
			'city' => 'Memmingen',
			'phone' => 112,
			'email' => 'office@my-sub.de'
			));

		$ad2 = new AddressModel(array(
			'firstName' => 'Max',
			'lastName' => 'Mustermann',
			'street' => 'Tuerkenstr 24',
			'streetAdditional' => 'Oben',
			'postal' => 13340,
			'city' => 'Berlin',
			'phone' => 112,
			'email' => 'julian@my-sub.de'
			));

		$ad3 = new AddressModel(array(
			'firstName' => 'Sebastian',
			'lastName' => 'Weigold',
			'street' => 'Maximilianstr 7',
			'postal' => 87700,
			'city' => 'Memmingen',
			'phone' => 112,
			'email' => 'store@my-sub.de'
			));

		$ad4 = new AddressModel(array(
			'firstName' => 'Max',
			'lastName' => 'Musterfrau',
			'street' => 'Memmingerstr 23',
			'postal' => 89073,
			'city' => 'Ulm'
			));

		$ad5 = new AddressModel(array(
			'street' => 'Blumenstr 17',
			'postal' => 10557,
			'city' => 'Berlin'
			));

		$ad6 = new AddressModel(array(
			'street' => 'Bahnhofs 3',
			'postal' => 10117,
			'city' => 'Berlin'
			));

		$ad7 = new AddressModel(array(
			'firstName' => 'Johannes',
			'lastName' => 'Schickling',
			'street' => 'Lerchenstr 4',
			'streetAdditional' => '4ter Stock',
			'postal' => 76185,
			'city' => 'Karlsruhe',
			'phone' => 112,
			'email' => 'offi23ce@my-sub.de'
			));

		$ad8 = new AddressModel(array(
			'firstName' => 'Johannes',
			'lastName' => 'Schickling',
			'street' => 'Kaiserallee 16',
			'streetAdditional' => '4ter Stock',
			'postal' => 76185,
			'city' => 'Karlsruhe',
			'phone' => 112,
			'email' => 'offi23ce@my-sub.de'
			));

		$ad9 = new AddressModel(array(
			'firstName' => 'Johannes',
			'lastName' => 'Schickling',
			'street' => 'Reihnstr 4',
			'streetAdditional' => '4ter Stock',
			'postal' => 76185,
			'city' => 'Karlsruhe',
			'phone' => 112,
			'email' => 'offi23ce@my-sub.de'
			));

		// Clients
		$u2 = new ClientModel(array(
			'number' => 23,
			'password' => Hash::make('hallo'),
			'email' => 'office@my-sub.de'
			));
		$u2->save();
		$u2->addressModel()->save($ad1);

		$u3 = new ClientModel(array(
			'number' => 25,
			'password' => Hash::make('hallo'),
			'email' => 'test@web.de'
			));
		$u3->save();
		$u3->addressModel()->save($ad2);

		$u4 = new ClientModel(array(
			'number' => 215,
			'password' => Hash::make('hallo'),
			'email' => 'test2@web.de'
			));
		$u4->save();
		$u4->addressModel()->save($ad7);

		$u5 = new ClientModel(array(
			'number' => 2115,
			'password' => Hash::make('haallo'),
			'email' => 'tesdgst2@web.de'
			));
		$u5->save();
		$u5->addressModel()->save($ad8);

		$u6 = new ClientModel(array(
			'number' => 2215,
			'password' => Hash::make('haaallo'),
			'email' => 'tesdsst2@web.de'
			));
		$u6->save();
		$u6->addressModel()->save($ad9);

		// store_models
		$s1 = new StoreModel(array(
			'title' => 'Memmingen',
			'number' => 41786,
			'isActive' => true,
			'isOpen' => true,
			'client_model_id' => $u2->id
			));
		$s1->save();

		$s2 = new StoreModel(array(
			'title' => 'Ulm 2',
			'number' => 23345,
			'isActive' => true,
			'client_model_id' => $u3->id
			));
		$s2->save();

		$s3 = new StoreModel(array(
			'title' => 'Berlin 1',
			'number' => 22345,
			'isActive' => true,
			'isOpen' => true,
			'client_model_id' => $u3->id
			));
		$s3->save();

		$s4 = new StoreModel(array(
			'title' => 'Berlin 2',
			'number' => 22355,
			'isActive' => true,
			'client_model_id' => $u3->id
			));
		$s4->save();

		$s5 = new StoreModel(array(
			'title' => 'Karlsruhe',
			'number' => 21355,
			'isActive' => true,
			'isOpen' => true,
			'client_model_id' => $u4->id
			));
		$s5->save();

		$s6 = new StoreModel(array(
			'title' => 'Karlsruhe 2',
			'number' => 25355,
			'isActive' => true,
			'isOpen' => true,
			'client_model_id' => $u5->id
			));
		$s6->save();

		$s7 = new StoreModel(array(
			'title' => 'Karlsruhe 3',
			'number' => 25345,
			'isActive' => true,
			'isOpen' => true,
			'client_model_id' => $u6->id
			));
		$s7->save();

		// Delivery Areas
		$da1 = new DeliveryAreaModel(array(
			'store_model_id' => $s5->id,
			'postal' => 76185,
			'description' => 'Liefergebiet 1'
			));
		$da1->save();

		$da2 = new DeliveryAreaModel(array(
			'store_model_id' => $s5->id,
			'postal' => 76185,
			'description' => 'Liefergebiet 2'
			));
		$da2->save();

		$da3 = new DeliveryAreaModel(array(
			'store_model_id' => $s7->id,
			'postal' => 76185,
			'description' => 'Liefergebiet 2'
			));
		$da3->save();

		$da4 = new DeliveryAreaModel(array(
			'store_model_id' => $s6->id,
			'postal' => 76185,
			'description' => 'Liefergebiet 2'
			));
		$da4->save();

		
		
		// Empty orders
		for ($i = 0; $i < 1000; $i++) {
			$order = new OrderModel(array(
				'paymentMethod' => 'cash',
				'store_model_id' => 1
				));
			$order->save();

			$customerAddress = new AddressModel(array(
				'firstName' => 'Max',
				'lastName' => 'Mustermann',
				'street' => 'Tuerkenstr 24',
				'streetAdditional' => 'Oben',
				'postal' => 13340,
				'city' => 'Berlin',
				'phone' => 112,
				'email' => 'julian@my-sub.de'
				));

			$order->addressModel()->save($customerAddress);
			unset($customerAddress);
			unset($order);
		}

		
	}

}