<?php namespace App\Tests\Api\Frontend;

use App\Tests\TestCase;


class StoresControllerTest extends TestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testInsecureIndexAvaiable()
	{
		$response = $this->call('GET', 'api/frontend/stores');
		$this->assertNotNull($response);
	}

}