<?php

use App\Models\ClientModel;
use App\Models\AddressModel;
use App\Models\BankaccountModel;
use App\Models\StoreModel;

class ClientModelSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$addressModel = new AddressModel(array(
			'firstName' => 'Sebastian',
			'lastName' => 'Weigold',
			'street' => 'Maximilianstr 4',
			'streetAdditional' => '',
			'postal' => 87700,
			'city' => 'Memmingen',
			'phone' => '083318338433',
			'email' => 'office@my-sub.de'
			));

		$bankaccountModel = new BankaccountModel(array(
			'name' => 'Sebastian Weigold',
			'bankName' => 'Sparkasse Memmingen-Lindau-Mindelheim',
			'bankCodeNumber' => 73150000,
			'accountNumber' => 1001012606
			));

		$clientData = array(
			'hashedPassword' => Hash::make('password'),
			'number' => 1000
			);

		$clientModel = new ClientModel($clientData);
		$clientModel->save();

		// save relations
		$clientModel->addressModel()->save($addressModel);
		$clientModel->bankaccountModel()->save($bankaccountModel);


		$storeData = array(
			'title' => 'Memmingen',
			'orderEmail' => 'office@my-sub.de',
			'number' => 1000,
			'commissionRate' => 0.05,
			'isActive' => true,
			'isOpen' => true,
			'allowsPaymentCash' => true,
			'allowsPaymentEc' => true
			);

		$storeModel = new StoreModel($storeData);
		$clientModel->storesCollection()->save($storeModel);

	}

}