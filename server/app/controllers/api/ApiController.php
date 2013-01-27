<?php namespace App\Controllers\Api;

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

	public $restful = true;

	/**
	 * Checks if store exists and sets store as property
	 * 
	 * @return void
	 */
	protected function loadStoreModel()
	{
		$aliasAlias = Request::segment(4);
		$this->storeModel = StoreModel::where('alias', $aliasAlias)->first();

    	if ($this->storeModel == null) {
    		App::abort(404);
    	}
	}

	/**
	 * Checks if storeId matches the id of this store
	 * 
	 * @return void
	 */
	protected function checkOwner($storeId)
	{
		// lazy load store
		if ($this->store == null) {
			$this->checkStore();
		}

		if ($storeId != $this->store->id) {
			throw new Exception("No access");
		}
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