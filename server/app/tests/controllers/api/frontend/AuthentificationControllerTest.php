<?php namespace App\Tests\Controllers\Api\Frontend;

use App\Tests\TestCase;

use Hash;
use URL;

use App\Models\ClientModel;


class AuthentificationControllerTest extends TestCase {

	public function testLoginShouldBeSuccessful()
	{
		// $loginFormData = array(
		// 	'number' => 1,
		// 	'password' => 'hallo'
		// 	);
		// // $secureUrl = URL::secure('api/frontend/login');
		// $secureUrl = 'https://sub2home.dev/api/frontend/login';
		// $response = $this->call('POST', $secureUrl, $loginFormData);

		// $this->assertTrue($response->isOk());
		// $token = $response->getContent();

	}

	public function testLoginWithoutHeadersShouldFail()
	{
		$secureUrl = 'https://sub2home.dev/api/frontend/login';
		$response = $this->call('POST', $secureUrl);

		$this->assertEquals($response->getStatusCode(), 400);
	}

	public function testLoginWithoutDataShouldFail()
	{
	}

	public function testLoginWithWrongDataShouldFail()
	{
	}

	public function testLoginShouldBlockAfterThreeFailedRequests()
	{
	}

	public function testCheckTokenWithoutHeadersShouldFail()
	{
		// $secureUrl = URL::secure('api/frontend/checktoken');
		$secureUrl = 'https://sub2home.dev/api/frontend/checktoken';
		$response = $this->call('POST', $secureUrl);

		$this->assertEquals($response->getStatusCode(), 401);
	}

	public function testCheckTokenWithoutWrongTokenShouldFail()
	{
	}


	protected function seedDatabase()
	{
		$clientModel = new ClientModel(array(
			'number' => 1,
			'password' => Hash::make('hallo'),
			'email' => 'client@test.de'
			));
		$clientModel->save();
		$clientModel->addressModel()->create(array());

	}

}