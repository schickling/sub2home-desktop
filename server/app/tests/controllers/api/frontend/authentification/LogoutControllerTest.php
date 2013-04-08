<?php namespace App\Tests\Controllers\Api\Frontend\Authentification;

use Cache;


class LogoutControllerTest extends AuthentificationTestCase {

	
	public function testShouldBeSuccessful()
	{
		// $token = $this->getTokenOfSuccessfulLogin();

		// // TODO
		// $logoutResponse = $this->call('POST', $this->getUrl());
		// // $this->assertResponseOk();


		// // check cache
		// $cacheResult = Cache::get($token);
		// $this->assertNull($cacheResult);
	}

	private function getUrl()
	{
		return 'https://sub2home.dev/api/frontend/logout';
	}

}