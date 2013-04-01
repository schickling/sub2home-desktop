<?php

use App\Models\ClientModel;
use App\Models\AddressModel;
use App\Models\BankaccountModel;
use App\Models\StoreModel;
use App\Models\DeliveryAreaModel;

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
			'hashedPassword' => Hash::make('G3Tazubr'),
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

		// create delivery areas
		$deliveryAreas = array(
			array(
				'postal'			=> 87700,
				'city'				=> 'Memmingen',
				'district'			=> 'Amendingen',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 12.00
				),
			array(
				'postal'			=> 87700,
				'city'				=> 'Memmingen',
				'district'			=> 'Ind. Geb. Nord',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 12.00
				),
			array(
				'postal'			=> 87766,
				'city'				=> 'Memmingerberg',
				'district'			=> '',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 12.00
				),
			array(
				'postal'			=> 87740,
				'city'				=> 'Buxheim',
				'district'			=> '',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 12.00
				),
			array(
				'postal'			=> 87734,
				'city'				=> 'Benningen',
				'district'			=> '',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 12.00
				),
			array(
				'postal'			=> 87749,
				'city'				=> 'Hawangen',
				'district'			=> '',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 16.00
				),
			array(
				'postal'			=> 87779,
				'city'				=> 'Trunkelsberg',
				'district'			=> '',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 16.00
				),
			array(
				'postal'			=> 87781,
				'city'				=> 'Ungerhausen',
				'district'			=> '',
				'minimumDuration'	=> 35,
				'minimumValue'		=> 25.00
				),
			array(
				'postal'			=> 87751,
				'city'				=> 'Heimertingen',
				'district'			=> '',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 25.00
				),
			array(
				'postal'			=> 88459,
				'city'				=> 'Tannheim',
				'district'			=> '',
				'minimumDuration'	=> 35,
				'minimumValue'		=> 25.00
				),
			array(
				'postal'			=> 87748,
				'city'				=> 'Fellheim',
				'district'			=> '',
				'minimumDuration'	=> 35,
				'minimumValue'		=> 25.00
				),
			array(
				'postal'			=> 87789,
				'city'				=> 'Woringen',
				'district'			=> '',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 25.00
				),
			array(
				'postal'			=> 87724,
				'city'				=> 'Ottobeuren',
				'district'			=> '',
				'minimumDuration'	=> 35,
				'minimumValue'		=> 25.00
				),
			array(
				'postal'			=> 87760,
				'city'				=> 'Lachen',
				'district'			=> '',
				'minimumDuration'	=> 25,
				'minimumValue'		=> 25.00
				),
			array(
				'postal'			=> 87779,
				'city'				=> 'Bad Grönenbach',
				'district'			=> '',
				'minimumDuration'	=> 30,
				'minimumValue'		=> 30.00
				)
			);

			foreach ($deliveryAreas as $deliveryArea) {
				$deliveryAreaModel = new DeliveryAreaModel($deliveryArea);
				$storeModel->deliveryAreasCollection()->save($deliveryAreaModel);
			}


	}

}