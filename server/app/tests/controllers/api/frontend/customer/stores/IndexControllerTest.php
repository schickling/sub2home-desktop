<?php namespace App\Tests\Controllers\Api\Frontend\Customer\Stores;

use App\Tests\TestCase;
use App\Models\StoreModel;


class IndexControllerTest extends TestCase {

    protected $loadMigrations = true;

	public function testShouldMatch()
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

		$this->assertResponseOk();
		

		$jsonStoresFromResponse = $response->getContent();
		$storesFromResponse = json_decode($jsonStoresFromResponse, true);

		$this->assertEquals($storesFromResponse, $realStores);
	}

	protected function seedDatabase()
	{
		$this->createTestStore();
	}

}