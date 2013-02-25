<?php namespace App\Tests\Models;

use App\Tests\TestCase;

use Hash;

use App\Models\StoreModel;
use App\Models\ClientModel;


class StoreModelTest extends TestCase {

	public function testCoordsOnModelCreate()
	{
		$storeModel = StoreModel::where('number', 1)->first();

		$expectedLatitude = 47.984883;
		$expectedLongitude = 10.182592;

		$this->assertEquals($storeModel->latitude, $expectedLatitude);
		$this->assertEquals($storeModel->longitude, $expectedLongitude);
	}

	public function testCoordsOnAddressChange()
	{
		$storeModel = StoreModel::where('number', 1)->first();
		$addressModel = $storeModel->addressModel;

		$addressModel->street = 'Illerstr 11';

		// reload storeModel
		$storeModel = StoreModel::find($storeModel->id);

		$expectedLatitude = 47.98923;
		$expectedLongitude = 10.1766;

		$this->assertEquals($storeModel->latitude, $expectedLatitude);
		$this->assertEquals($storeModel->longitude, $expectedLongitude);
	}

	protected function seedDatabase()
	{
		$address = array(
			'street' => 'Maximilianstr 4',
			'postal' => 87700,
			'city' => 'Memmingen'
			);

		$clientModel = new ClientModel(array(
			'number' => 1,
			'hashedPassword' => Hash::make('superSecure'),
			'email' => 'firstClient@test.de'
			));
		$clientModel->save();
		$clientModel->addressModel()->create($address);

		$storeModel = new StoreModel(array(
			'title' => 'Teststore',
			'number' => 1,
			'client_model_id' => $clientModel->id
			));
		$storeModel->save();
	}

}