<?php namespace App\Tests\Controllers\Api\Frontend;

use App\Tests\TestCase;

use Hash;

use App\Models\StoreModel;
use App\Models\ClientModel;


class StoresControllerTest extends TestCase {

	public function testIndex()
	{
		$response = $this->call('GET', 'api/frontend/stores');

		$realStoresCollection = StoreModel::with(array(
												'deliveryAreasCollection',
												'deliveryTimesCollection'
												))
											->where('isOpen', true)
											->where('isActive', true)
											->get();
		$realStores = $realStoresCollection->toArray();

		$this->assertTrue($response->isOk());

		$jsonStoresFromResponse = $response->getContent();
		$storesFromResponse = json_decode($jsonStoresFromResponse, true);

		$this->assertEquals($storesFromResponse, $realStores);
	}

	protected function seedDatabase()
	{
		$firstAddress = array(
			'firstName' => 'Johannes',
			'lastName' => 'Schickling',
			'street' => 'Kaiserallee 16',
			'streetAdditional' => '4ter Stock',
			'postal' => 76185,
			'city' => 'Karlsruhe',
			'phone' => 112,
			'email' => 'test@my-sub.de'
			);

		$firstClientModel = new ClientModel(array(
			'number' => 1,
			'hashedPassword' => Hash::make('haallo'),
			'email' => 'firstClient@test.de'
			));
		$firstClientModel->save();
		$firstClientModel->addressModel()->create($firstAddress);

		$firstStoreModel = new StoreModel(array(
			'title' => 'Teststore 1',
			'number' => 1,
			'isActive' => true,
			'isOpen' => true,
			'client_model_id' => $firstClientModel->id,
			'orderEmail' => 'test@test.de'
			));
		$firstStoreModel->save();
	}

}