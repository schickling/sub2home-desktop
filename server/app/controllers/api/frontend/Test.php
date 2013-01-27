<?php namespace App\Controllers\Api\Frontend;

use App\Controllers\Api\ApiController;

class TestController extends ApiController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($alias)
	{
		return "Hallo Welt " . $alias;
	}


}