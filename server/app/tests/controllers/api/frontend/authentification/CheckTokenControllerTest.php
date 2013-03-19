<?php namespace App\Tests\Controllers\Api\Frontend\Authentification;


class CheckTokenControllerTest extends AuthentificationTestCase {


	public function testWithoutHeadersShouldFail()
	{
		$response = $this->call('POST', $this->getUrl());

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testWithWrongTokenShouldFail()
	{
		$content = 'Token: xx';
		$response = $this->call('POST', $this->getUrl(), array(), array(), array(), $content);

		$this->assertEquals(401, $response->getStatusCode());
	}

	public function testShouldBeSuccessful()
	{
		$token = $this->getTokenOfSuccessfulLogin();

		$content = 'Token: ' . $token;
		$server = array(
			'HTTP_Token' => $token,
			'Token' => $token
			);
		$tokenResponse = $this->call('POST', $this->getUrl(), array(), array(), $server, $content);

		// TODO
		// $this->assertResponseOk();
	}

	private function getUrl()
	{
		return 'https://sub2home.dev/api/frontend/checktoken';
	}

}