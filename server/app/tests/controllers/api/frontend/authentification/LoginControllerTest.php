<?php namespace App\Tests\Controllers\Api\Frontend\Authentification;

use Cache;
use App\Models\ClientModel;


class LoginControllerTest extends AuthentificationTestCase {

	protected $route = 'https://sub2home.dev/api/frontend/login';
	protected $method = 'POST';

	public function testShouldBeSuccessful()
	{
		$token = $this->getTokenOfSuccessfulLogin();

		$cachedClientModelId = Cache::get($token);
		$realClientModelId = ClientModel::where('number', $this->correctNumber)->first()->id;

		$this->assertEquals($cachedClientModelId, $realClientModelId);
	}

	public function testWithoutHeadersShouldFail()
	{
		$this->callRoute();
		$this->assertResponseStatus(401);
	}

	public function testWithoutDataShouldFail()
	{
		$loginFormData = array();
		$this->callRoute($loginFormData);

		$this->assertResponseStatus(401);
	}

	public function testWithWrongPasswordShouldFail()
	{
		$loginFormData = array(
			'number' => $this->correctNumber,
			'password' => $this->wrongPassword
			);
		$this->callRoute($loginFormData);

		$this->assertResponseStatus(401);
	}

	public function testShouldBlockAfterFiveRequestsWithWrongPassword()
	{
		$loginFormData = array(
			'number' => $this->correctNumber,
			'password' => $this->wrongPassword
			);

		// first try
		$this->callRoute($loginFormData);
		$this->assertResponseStatus(401);

		// second try
		$this->callRoute($loginFormData);
		$this->assertResponseStatus(401);

		// third try
		$this->callRoute($loginFormData);
		$this->assertResponseStatus(401);

		// fourth try
		$this->callRoute($loginFormData);
		$this->assertResponseStatus(401);

		// fifth try
		$this->callRoute($loginFormData);
		$this->assertResponseStatus(401);

		// sixth try
		$this->callRoute($loginFormData);
		$this->assertResponseStatus(429);

	}

}