<?php namespace App\Tests\Controllers\Api\Frontend;

use App\Tests\TestCase;

use Hash;
use Cache;

use App\Models\ClientModel;


class AuthentificationControllerTest extends TestCase {

	public function testLoginShouldBeSuccessful()
	{
		$response = $this->getReponseOfSuccessfulLogin();

		$this->assertTrue($response->isOk());

		$contentObject = json_decode($response->getContent());
		$token = $contentObject->token;

		$cachedClientModelId = Cache::get($token);
		$realClientModelId = ClientModel::where('number', '1')->first()->id;

		$this->assertEquals($cachedClientModelId, $realClientModelId);
	}

	public function testLoginWithoutHeadersShouldFail()
	{
		$response = $this->call('POST', $this->getLoginUrl());

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testLoginWithoutDataShouldFail()
	{
		$loginFormData = array();
		$response = $this->call('POST', $this->getLoginUrl(), $loginFormData);

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testLoginWithWrongPasswordShouldFail()
	{
		$loginFormData = array(
			'number' => 1,
			'password' => 'wrong'
			);
		$response = $this->call('POST', $this->getLoginUrl(), $loginFormData);

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testLoginShouldBlockAfterThreeRequestsWithWrongPassword()
	{
		$loginFormData = array(
			'number' => 1,
			'password' => 'wrong'
			);

		// first try
		$response = $this->call('POST', $this->getLoginUrl(), $loginFormData);
		$this->assertEquals(401, $response->getStatusCode());

		// second try
		$response = $this->call('POST', $this->getLoginUrl(), $loginFormData);
		$this->assertEquals(401, $response->getStatusCode());

		// third try
		$response = $this->call('POST', $this->getLoginUrl(), $loginFormData);
		$this->assertEquals(401, $response->getStatusCode());

		// fourth try
		$response = $this->call('POST', $this->getLoginUrl(), $loginFormData);
		$this->assertEquals(429, $response->getStatusCode());
	}

	public function testCheckTokenWithoutHeadersShouldFail()
	{
		$response = $this->call('POST', $this->getCheckTokenUrl());

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testCheckTokenWithWrongTokenShouldFail()
	{
		$content = 'Token: xx';
		$response = $this->call('POST', $this->getCheckTokenUrl(), array(), array(), array(), $content);

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testCheckTokenShouldBeSuccessful()
	{
		$loginResponse = $this->getReponseOfSuccessfulLogin();

		$contentObject = json_decode($loginResponse->getContent());
		$token = $contentObject->token;

		$content = 'Token: ' . $token;
		$server = array(
			'HTTP_Token' => $token,
			'Token' => $token
			);
		$tokenResponse = $this->call('POST', $this->getCheckTokenUrl(), array(), array(), $server, $content);

		// TODO
		// $this->assertTrue($tokenResponse->isOk());
	}

	public function testLogoutShouldBeSuccessful()
	{
		$loginResponse = $this->getReponseOfSuccessfulLogin();

		$contentObject = json_decode($loginResponse->getContent());
		$token = $contentObject->token;

		// TODO
		$logoutResponse = $this->call('POST', $this->getLogoutUrl());
		// $this->assertTrue($logoutResponse->isOk());

		// check cache
		$cacheResult = Cache::get($token);
		// $this->assertNull($cacheResult);
	}


	protected function seedDatabase()
	{
		$clientModel = new ClientModel(array(
			'number' => 1,
			'hashedPassword' => Hash::make('superSecure'),
			'email' => 'client@test.de'
			));
		$clientModel->save();
		$clientModel->addressModel()->create(array());

	}

	/*
	 * helper methods
	 */
	
	private function getReponseOfSuccessfulLogin()
	{
		$loginFormData = array(
			'number' => 1,
			'password' => 'superSecure'
			);

		return $this->call('POST', $this->getLoginUrl(), $loginFormData);
	}

	private function getLoginUrl()
	{
		return 'https://sub2home.dev/api/frontend/login';
	}

	private function getLogoutUrl()
	{
		return 'https://sub2home.dev/api/frontend/logout';
	}

	private function getCheckTokenUrl()
	{
		return 'https://sub2home.dev/api/frontend/checktoken';
	}

}