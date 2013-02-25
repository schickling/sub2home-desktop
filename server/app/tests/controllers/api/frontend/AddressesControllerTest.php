<?php namespace App\Tests\Controllers\Api\Frontend;

use App\Tests\TestCase;

use Hash;

use App\Models\ClientModel;
use App\Models\StoreModel;


class AddressesControllerTest extends TestCase {

	private $correctAddress = array(
			'firstName' => 'Johannes',
			'lastName' => 'Schickling',
			'street' => 'Kaiserallee 16',
			'streetAdditional' => '4ter Stock',
			'postal' => 76185,
			'city' => 'Karlsruhe',
			'phone' => 112,
			'email' => 'johannes@my-sub.de'
			);

	private $changedCorrectAddress = array(
			'firstName' => 'Max',
			'lastName' => 'Mustermann',
			'street' => 'Rudolfstr. 4',
			'streetAdditional' => 'Keller',
			'postal' => 76133,
			'city' => 'Karlsruhe',
			'phone' => 110,
			'email' => 'max@my-sub.de'
			);

	public function testUpdateShouldFailWithoutPermission()
	{
		$storeModel = StoreModel::where('number', 1)->first();
		$addressModel = $storeModel->addressModel;
		// TODO
		$apiUrl = 'https://sub2home.dev/api/frontend/stores/' . $storeModel->alias . '/addresses/' . $addressModel->id;

		$jsonPayload = json_encode($this->changedCorrectAddress);
		$response = $this->call('PUT', $apiUrl, array(), array(), array(), $jsonPayload);

		$this->assertEquals(401, $response->getStatusCode());
	}

	protected function seedDatabase()
	{

		$clientModel = new ClientModel(array(
			'number' => 1,
			'hashedPassword' => Hash::make('haallo'),
			'email' => 'client@test.de'
			));
		$clientModel->save();
		$clientModel->addressModel()->create($this->correctAddress);

		$storeModel = new StoreModel(array(
			'title' => 'Teststore',
			'number' => 1,
			'isActive' => true,
			'isOpen' => true,
			'client_model_id' => $clientModel->id,
			'orderEmail' => 'test@test.de'
			));
		$storeModel->save();
	}

}