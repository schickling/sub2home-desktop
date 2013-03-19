<?php namespace App\Tests\Controllers\Api\Frontend\Customer\Stores;

use App\Tests\TestCase;
use App\Models\StoreModel;


class ShowControllerTest extends TestCase {

    protected $loadMigrations = true;

	public function testShouldMatch()
	{
		$response = $this->call('GET', 'api/frontend/stores/memmingen');

		$storeModel = StoreModel::with(array(
									'deliveryAreasCollection',
									'deliveryTimesCollection',
									'addressModel'
									))
								->where('alias', 'memmingen')
								->where('isOpen', true)
								->where('isActive', true)
								->first();

		$realStore = $storeModel->toArray();

		$this->assertResponseOk();

		$jsonStoreFromResponse = $response->getContent();
		$storeFromResponse = json_decode($jsonStoreFromResponse, true);

		$this->assertEquals($realStore, $storeFromResponse);
	}

	public function testShouldNotBeFound()
	{
		$response = $this->call('GET', 'api/frontend/stores/not-there');

		$this->assertEquals(404, $response->getStatus());
	}

	protected function seedDatabase()
	{
		$this->createTestStore();
	}

}