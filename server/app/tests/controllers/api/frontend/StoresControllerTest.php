<?php namespace App\Tests\Controllers\Api\Frontend;

use App\Tests\TestCase;

use Hash;

use App\Models\StoreModel;
use App\Models\ClientModel;


class StoresControllerTest extends TestCase {

    protected $loadMigrations = true;

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
		$this->createTestStore();
	}

}