<?php namespace App\Tests\Controllers\Api\Frontend\Client;

use App\Tests\TestCase;


class ClientTestCase extends TestCase {

	abstract protected function testShouldFailWhenNotAuthentificated();

}