<?php namespace App\Controllers\Api\Frontend\Authentification;

use App\Controllers\Api\Common\BaseApiController;
use App\Exceptions\NotAuthentificatedException;


/**
* 
*/
abstract class ApiController extends BaseApiController
{

	protected function throwException()
	{
		throw new NotAuthentificatedException();
	}

}