<?php namespace App\Controllers\Api\Frontend;

use Controller;
use Request;
use App;
use StoreModel;

/**
* 
*/
class ApiController extends Controller
{
	protected $storeModel;

	/**
	 * Checks if store exists and sets store as property
	 * 
	 * @return void
	 */
	protected function loadStoreModel()
	{
		$storeAlias = Request::segment(4);
		$this->storeModel = StoreModel::where('alias', $storeAlias)->first();

    	if ($this->storeModel == null) {
    		$this->error(404);
    	}
	}

	protected function error($errorCode) {
		App::abort($errorCode);
	}

	/**
	 * verify!
	 * 
	 * @return boolean
	 */
	protected function isAuthenicatedClient()
	{
		return true;
	}

	/**
	 * Catch-all method for requests that can't be matched.
	 *
	 * @param  string    $method
	 * @param  array     $parameters
	 * @return Response
	 */
	public function __call($method, $parameters)
	{
		// return App::abort(404);
	}

}