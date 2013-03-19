<?php namespace App\Tests\Controllers\Api\Frontend\Authentification;

use Cache;
use App\Models\ClientModel;


class LoginControllerTest extends AuthentificationTestCase {


	public function testShouldBeSuccessful()
	{
		$token = $this->getTokenOfSuccessfulLogin();

		$cachedClientModelId = Cache::get($token);
		$realClientModelId = ClientModel::where('number', $this->correctNumber)->first()->id;

		$this->assertEquals($cachedClientModelId, $realClientModelId);
	}

	public function testWithoutHeadersShouldFail()
	{
		$response = $this->call('POST', $this->getUrl());

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testWithoutDataShouldFail()
	{
		$loginFormData = array();
		$response = $this->call('POST', $this->getUrl(), $loginFormData);

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testWithWrongPasswordShouldFail()
	{
		$loginFormData = array(
			'number' => $this->correctNumber,
			'password' => $this->wrongPassword
			);
		$response = $this->call('POST', $this->getUrl(), $loginFormData);

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testShouldBlockAfterFiveRequestsWithWrongPassword()
	{
		$loginFormData = array(
			'number' => $this->correctNumber,
			'password' => $this->wrongPassword
			);

		// first try
		$response = $this->call('POST', $this->getUrl(), $loginFormData);
		$this->assertEquals(401, $response->getStatusCode());

		// second try
		$response = $this->call('POST', $this->getUrl(), $loginFormData);
		$this->assertEquals(401, $response->getStatusCode());

		// third try
		$response = $this->call('POST', $this->getUrl(), $loginFormData);
		$this->assertEquals(401, $response->getStatusCode());

		// fourth try
		$response = $this->call('POST', $this->getUrl(), $loginFormData);
		$this->assertEquals(401, $response->getStatusCode());

		// fifth try
		$response = $this->call('POST', $this->getUrl(), $loginFormData);
		$this->assertEquals(401, $response->getStatusCode());

		// sixth try
		$response = $this->call('POST', $this->getUrl(), $loginFormData);
		$this->assertEquals(429, $response->getStatusCode());
	}

	private function getUrl()
	{
		return 'https://sub2home.dev/api/frontend/login';
	}

}