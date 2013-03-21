<?php namespace App\Controllers\Api\Services;

use App\Controllers\Api\Common\BaseApiController;
use Input;
use App\Controllers\Services\Image\DecodeQRCodeService;

use App\Models\StoreModel;

/**
* 
*/
class DecodeQRCodeController extends BaseApiController
{

	public function decode()
	{
		return DecodeQRCodeService::decodeImage('/Users/johannes/Downloads/Subcard Julian.jpg');
	}

}