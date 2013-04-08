<?php namespace App\Tests\Controllers\Api\Frontend\Customer\Stores;

use App\Tests\Controllers\Api\ApiTestCase;
use App\Models\StoreModel;


class ShowControllerTest extends ApiTestCase {

	protected $route = 'api/frontend/stores/memmingen';
	protected $method = 'GET';

	public function testShouldMatch()
	{
		// $this->callRoute();

		// $storeModel = StoreModel::with(array(
		// 							'deliveryAreasCollection',
		// 							'deliveryTimesCollection',
		// 							'addressModel'
		// 							))
		// 						->where('alias', 'memmingen')
		// 						->where('isOpen', true)
		// 						->where('isActive', true)
		// 						->first();

		// $realStore = $storeModel->toArray();

		// $storeFromResponse = $this->getDecodedContent();
		// $this->assertEquals($realStore, $storeFromResponse);
	}

	protected function seedDatabase()
	{
		// $this->createTestStore();
	}

}