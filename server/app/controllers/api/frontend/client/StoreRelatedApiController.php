<?php namespace App\Controllers\Api\Frontend\Client;

use App\Controllers\Api\Common\BaseApiController;
use Request;

use Response;

use App\Models\StoreModel;


/**
* 
*/
abstract class StoreRelatedApiController extends BaseApiController
{
	protected $storeModel;

	public function __construct() {

		// check authentification
		$this->beforeFilter(function()
		{

			$this->checkAuthentification();

		});

	}

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
			$this->reportError(404);
		}
	}

	/**
	 * verify!
	 * 
	 * @return boolean
	 */
	protected function isAuthentificatedClient()
	{
		// load store model if needed
		if (!$this->storeModel) {
			$this->loadStoreModel();
		}

		if ($this->hasErrorOccured()) {
			return;
		}

		// get client id from store model
		$idFromStore = $this->storeModel->clientModel->id;

		// get client id from token
		$idFromToken = $this->getClientModelIdFromToken();

		if ($this->hasErrorOccured()) {
			return;
		}

		return $idFromStore == $idFromToken;
	}


	protected function checkAuthentification()
	{
		if (!$this->isAuthentificatedClient()) {
			$this->reportError(401);
		}
	}

	protected function checkBelongsToThisStore($storeIdOfElement)
	{
		// // load store model if needed
		// if (!$this->storeModel) {
		// 	$this->loadStoreModel();
		// }

		// if ($this->storeModel->id != $storeIdOfElement) {
		// 	$this->reportError(401);
		// }
	}


    /**
     * Checks if the given token is still in cache
     * 
     * @return Response
     */
    protected function getClientModelIdFromToken()
    {

        if (!$this->hasToken()) {
            $this->reportError(401);
            return;
        }

        $token = Request::header('Token');
        $client_model_id = Cache::get($token);

        if (!$client_model_id) {
            $this->reportError(401);
            return;
        }

        return $client_model_id;

    }

    protected function hasToken() {
        $token = Request::header('Token');

        return $token != null;
    }


}