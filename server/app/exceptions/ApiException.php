<?php namespace App\Exceptions;

use Exception;

class ApiException extends Exception {

	public function getStatusCode()
	{
		return $this->getMessage();
	}

}
