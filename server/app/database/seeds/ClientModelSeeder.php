<?php

use App\Models\ClientModel;
use App\Models\StoreModel;

class ClientModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$addressData = array(
			'firstName' => 'Sebastian',
			'lastName' => 'Weigold',
			'street' => 'Maximilianstr 4',
			'streetAdditional' => '',
			'postal' => 87700,
			'city' => 'Memmingen',
			'phone' => '083318338433',
			'email' => 'office@my-sub.de'
			);

		$bankaccountData = array(
			'name' => 'Sebastian Weigold',
			'bankName' => 'Sparkasse Memmingen-Lindau-Mindelheim',
			'bankCodeNumber' => 73150000,
			'accountNumber' => 1001012606
			);

		$clientData = array(
			'hashedPassword' => Hash::make('phegEk7D'),
			'number' => 1000
			);

		$clientModel = new ClientModel($clientData);
		$clientModel->save();

		$clientModel->addressModel->fill($addressData);
		$clientModel->addressModel->save();

		$clientModel->bankaccountModel->fill($bankaccountData);
		$clientModel->bankaccountModel->save();


		$storeData = array(
			'title' => 'Memmingen',
			'orderEmail' => 'office@my-sub.de',
			'number' => 1000,
			'commissionRate' => 0.05,
			'isActive' => true,
			'isOpen' => true,
			'description' => 'Willkommen in Memmingen',
			'allowsPaymentCash' => true,
			'allowsPaymentEc' => true
			);

		$storeModel = new StoreModel($storeData);
		$clientModel->storesCollection()->save($storeModel);

	}

}