<?php namespace App\Tests\Controllers\Services\Image;

use App\Tests\TestCase;

class DecodeQRCodeServiceTest extends TestCase {

	public function testDecodeShouldSucceedWithJPG()
	{
		$imagePath = __DIR__ . '/resources/success.jpg';
		$resourceClass = $this->getResourceClass();
		$info = $resourceClass::decodeImage($imagePath);

		$this->assertEquals('6338450312769174', $info);
	}

	public function testDecodeShouldThrowExceptionWithWrongImage()
	{
		$this->setExpectedException('App\\Exceptions\\ServiceException');

		$imagePath = __DIR__ . '/resources/fail.jpg';
		$resourceClass = $this->getResourceClass();
		$resourceClass::decodeImage($imagePath);
	}

}