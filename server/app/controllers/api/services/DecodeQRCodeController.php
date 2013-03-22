<?php namespace App\Controllers\Api\Services;

use App\Controllers\Api\Common\BaseApiController;
use Input;
use App\Controllers\Services\Image\DecodeQRCodeService;
use App\Exceptions\ServiceException;

use App\Models\StoreModel;

/**
* 
*/
class DecodeQRCodeController extends BaseApiController
{

	public function decode()
	{

		$input = Input::json();
		$rules = array(
			'image'	=> 'required'
			);

		$this->validateInput($rules);

		// prepare data
		$filePath = app_path() . '/storage/cache/' . uniqid();
		$base64 = $input['image'];
		$imagePattern = '/^data:image\/(png|jpeg);base64,/';

		// check if base64 is an image
		if (!preg_match($imagePattern, $base64)) {
			$this->throwException(400);
		}

		// prepare base64 string
		$base64 = preg_replace($imagePattern, '', $base64);

		// decode base 64 string
		$data = base64_decode($base64);

		// cache image
		$success = file_put_contents($filePath, $data);

		try {

			// decode qr image
			$decodedInfo = DecodeQRCodeService::decodeImage($filePath);

		} catch (ServiceException $exception) {
			$this->throwException(400);
		}

		// delete image
		unlink($filePath);

		// prepare resposne data
		$json = json_encode(array(
			'info' => $decodedInfo
			));

		return $this->respond(200, $json);
	}

}