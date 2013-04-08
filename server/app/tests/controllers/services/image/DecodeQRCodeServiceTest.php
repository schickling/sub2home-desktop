<?php namespace App\Tests\Controllers\Services\Image;

use App\Tests\TestCase;

class DecodeQRCodeServiceTest extends TestCase {

	public function testShouldSucceedWithDigitalImage()
	{
		$imagePath = __DIR__ . '/resources/successDigital.jpg';
		$resourceClass = $this->getResourceClass();
		$info = $resourceClass::decodeImage($imagePath);

		$this->assertEquals('6338450312769174', $info);
	}

	public function testShouldSucceedWithPhotoImage()
	{
		$imagePath = __DIR__ . '/resources/successPhoto.jpg';
		$resourceClass = $this->getResourceClass();
		$info = $resourceClass::decodeImage($imagePath);

		$this->assertEquals('6338450312769174', $info);
	}

	public function testShouldThrowExceptionWithWrongImage()
	{
		$this->setExpectedException('App\\Exceptions\\ServiceException');

		$imagePath = __DIR__ . '/resources/fail.jpg';
		$resourceClass = $this->getResourceClass();
		$resourceClass::decodeImage($imagePath);
	}

}