<?php namespace App\Tests\Controllers\Api;

use App\Tests\TestCase;
use App\Exceptions\TestException;

abstract class ApiTestCase extends TestCase {

    protected $loadMigrations = true;

    protected $route;
    protected $method;

	public function testShouldThrowNotFoundException()
	{
		$this->setExpectedException('App\\Exceptions\\NotFoundException');
		$this->callRoute();
	}

    protected function getResponse()
    {
        return $this->client->getResponse();
    }

    protected function getDecodedContent()
    {
        return json_decode($this->getResponse()->getContent(), true);
    }

    protected function assertResponseOk()
    {
        $response = $this->getResponse();
        $this->assertTrue($response->isOk());
    }

    protected function assertResponseStatus($statusCode)
    {
    	$this->assertEquals($statusCode, $this->getResponse->getStatus());
    }

	protected function callRoute($formData = array())
	{
		if (!$this->route or !$this->method) {
			throw new TestException();
		}

		$this->call($this->method, $this->route, $formData);
		$this->assertResponseOk();
	}

}