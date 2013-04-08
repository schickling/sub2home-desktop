<?php namespace App\Tests\Controllers\Api;

use App\Tests\TestCase;
use App\Exceptions\TestException;

abstract class ApiTestCase extends TestCase {

	protected $loadMigrations = true;

	protected $method;

	private $headers = array();
	private $formData = array();

	protected function invokeException()
	{
		$this->setExpectedException('App\\Exceptions\\ApiException');
		$this->callAction();
	}

	protected function getResponse()
	{
		return $this->client->getResponse();
	}

	protected function getDecodedContent()
	{
		return json_decode($this->getResponse()->getContent(), true);
	}

	protected function assertResponseStatus($statusCode)
	{
		$this->assertEquals($statusCode, $this->getResponse->getStatus());
	}

	protected function callAction()
	{

		$method = $this->method;
		$classNameWithMethod = $this->getResourceClass() . '@route';
		$files = array();
		$formData = $this->formData;
		$headers = $this->headers;

		var_dump($classNameWithMethod);
		var_dump($method);

		$this->action($method, $classNameWithMethod, $formData, $files, $headers);

	}

	protected function setFormData($formData) {
		$this->formData = $formData;
	}

	protected function setHeaders($headers) {
		$this->headers = $headers;
	}

}