<?php namespace App\Tests\Controllers\Api\Frontend\Authentification;


class CheckTokenControllerTest extends AuthentificationTestCase {

	protected $route = 'https://sub2home.dev/api/frontend/checktoken';
	protected $method = 'POST';

	public function testWithoutHeadersShouldFail()
	{
		$this->callRoute();

		$this->assertResponseStatus(401);
	}

	public function testWithWrongTokenShouldFail()
	{
		$content = 'Token: xx';
		// $response = $this->call('POST', $this->getUrl(), array(), array(), array(), $content);
		$this->callRoute();

		$this->assertResponseStatus(401);
	}

	public function testShouldBeSuccessful()
	{
		$token = $this->getTokenOfSuccessfulLogin();

		$content = 'Token: ' . $token;
		$server = array(
			'HTTP_Token' => $token,
			'Token' => $token
			);
		// $tokenResponse = $this->call('POST', $this->getUrl(), array(), array(), $server, $content);
		$this->callRoute();

		// TODO
		// $this->assertResponseOk();
	}


}