<?php namespace App\Controllers\Api\Frontend;

use App\Controllers\Api\ApiController;
use StoreModel;
use App;

/**
* 
*/
class StoresController extends ApiController
{

	public function index()
	{
		$storesCollection = StoreModel::with(array('deliveryAreasCollection', 'deliveryTimesCollection'))
										->where('isOpen', true)
										->where('isActive', true)
										->get();

		return $storesCollection->toJson(JSON_NUMERIC_CHECK);

	}

	/**
	 * Returns the store as json object by his alias
	 * 
	 * @return string
	 */
	public function show($storeAlias)
	{
		$storeModel = StoreModel::with(array('deliveryAreasCollection', 'deliveryTimesCollection'))
							->where('alias', $storeAlias)
							->where('isOpen', true)
							->where('isActive', true)
							->first();

		if ($storeModel == null) {
			return App::abort(404);
		}

		return $storeModel->toJson(JSON_NUMERIC_CHECK);
	}


	/**
	 * Updates the store
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$this->checkStore();
		$store = $this->store;

		$input = Input::json();
		
		// store description
		$store->description = $input->description;
		
		// isOpen status
		$store->isOpen = $input->isOpen;

		// order mail adress
		$store->order_email = $input->order_email;

		// payment methods
		$store->payment_cash = $input->payment_cash;
		$store->payment_ec = $input->payment_ec;


		// Paypal hook
		
		// get paypal authorization
		if ($input->payment_paypal && (empty($store->paypal_token) || empty($store->paypal_tokensecret))) {

			$paypal_controller = IoC::resolve('payment_paypal');
			$url = $paypal_controller->request_permissions($this->store->id);

			// Returns the URL to the permission form
			return Response::make($url, 300);

		// already authorized
		} else {
			$store->payment_paypal = $input->payment_paypal;
		}

		$store->save();

	}

}