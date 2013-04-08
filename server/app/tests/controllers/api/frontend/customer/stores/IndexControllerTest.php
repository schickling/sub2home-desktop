<?php namespace App\Tests\Controllers\Api\Frontend\Customer\Stores;

use App\Tests\Controllers\Api\ApiTestCase;
use App\Models\StoreModel;


class IndexControllerTest extends ApiTestCase {

    protected $loadMigrations = true;

	protected $route = 'api/frontend/stores';
	protected $method = 'GET';

	public function testShouldMatch()
	{
		// $this->callRoute();
		// $this->assertResponseOk();

		// $realStoresCollection = StoreModel::with(array(
		// 										'deliveryAreasCollection',
		// 										'deliveryTimesCollection'
		// 										))
		// 									->where('isOpen', true)
		// 									->where('isActive', true)
		// 									->get();

		// $realStores = $realStoresCollection->toArray();
		// $storesFromResponse = $this->getDecodedContent();
		// $this->assertEquals($storesFromResponse, $realStores);
	}

	protected function seedDatabase()
	{
		// $this->createTestStore();
	}

}