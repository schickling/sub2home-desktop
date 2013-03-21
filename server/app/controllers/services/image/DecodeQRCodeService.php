<?php namespace App\Controllers\Services\Image;

use App\Exceptions\ServiceException;

class DecodeQRCodeService
{

	/**
	 * Decodes an qr code image and returns the included information
	 * 
	 * @param  object  $imagePath
	 * @return string
	 */
	public static function decodeImage($imagePath)
	{
		return static::decodeImageWithZxing($imagePath);
	}


	private static function decodeImageWithZxing($imagePath)
	{
		// prepare command string
		$libPath = __DIR__ . '/lib/zxing';
		$command = sprintf('java -cp %s/javase/javase.jar:%s/core/core.jar com.google.zxing.client.j2se.CommandLineRunner "%s"', $libPath, $libPath, $imagePath);

		// execute command
		exec($command, $outputArray, $exitStatus);

		// check result
		if ($exitStatus != 0 || !array_key_exists(2, $outputArray)) {
			throw new ServiceException();
		}

		// desired info is in third array row
		$info = $outputArray[2];

		return $info;
	}

}