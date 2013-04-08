<?php namespace App\Tests\Controllers\Api\Frontend\Authentification;

use Cache;
use App\Models\ClientModel;


class LoginControllerTest extends AuthentificationTestCase {

	protected $method = 'POST';

	public function testShouldBeSuccessful()
	{
		// $token = $this->getTokenOfSuccessfulLogin();

		// $cachedClientModelId = Cache::get($token);
		// $realClientModelId = ClientModel::where('number', $this->correctNumber)->first()->id;

		// $this->assertEquals($cachedClientModelId, $realClientModelId);
	}

	// public function testWithoutHeadersShouldFail()
	// {
	// 	$this->callAction();
	// 	$this->assertResponseStatus(401);
	// }

	// public function testWithoutDataShouldFail()
	// {
	// 	$this->callAction();

	// 	$this->assertResponseStatus(401);
	// }

	// public function testWithWrongPasswordShouldFail()
	// {
	// 	$loginFormData = array(
	// 		'number' => $this->correctNumber,
	// 		'password' => $this->wrongPassword
	// 		);
	// 	$this->setFormData($loginFormData);
	// 	$this->callAction();

	// 	$this->assertResponseStatus(401);
	// }

	// public function testShouldBlockAfterFiveRequestsWithWrongPassword()
	// {
	// 	$loginFormData = array(
	// 		'number' => $this->correctNumber,
	// 		'password' => $this->wrongPassword
	// 		);
	// 	$this->setFormData($loginFormData);

	// 	// first try
	// 	$this->callAction();
	// 	$this->assertResponseStatus(401);

	// 	// second try
	// 	$this->callAction();
	// 	$this->assertResponseStatus(401);

	// 	// third try
	// 	$this->callAction();
	// 	$this->assertResponseStatus(401);

	// 	// fourth try
	// 	$this->callAction();
	// 	$this->assertResponseStatus(401);

	// 	// fifth try
	// 	$this->callAction();
	// 	$this->assertResponseStatus(401);

	// 	// sixth try
	// 	$this->callAction();
	// 	$this->assertResponseStatus(429);

	// }

}