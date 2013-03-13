<?php namespace App\Controllers\Api\Frontend;

use Input;
use Response;
use Validator;
use App\Controllers\Services\Payment\PaypalService;

use App\Models\StoreModel;
use App\Models\DeliveryAreaModel;
use App\Models\DeliveryTimeModel;

/**
* 
*/
class StoresController extends ApiController
{

	public function index()
	{
		$storesCollection = StoreModel::with(array(
			'deliveryAreasCollection',
			'deliveryTimesCollection'
			))
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
		$storeModel = StoreModel::with(array(
			'deliveryAreasCollection',
			'deliveryTimesCollection',
			'addressModel'))
		->where('alias', $storeAlias)
		->where('isActive', true)
		->first();

		if ($storeModel == null) {
			return $this->respondWithStatus(404);
		}

		if ($this->hasToken() and $storeModel->clientModel->id == $this->getClientModelIdFromToken()) {

			$storeModel->setHidden((array(
				'paymentPaypalAuthHeader',
				'created_at',
				'updated_at',
				'isActive',
				'client_model_id'
				)));
			$storeModel->invoicesCollection = $storeModel->invoicesCollection;

		}

		return $storeModel->toJson(JSON_NUMERIC_CHECK);
	}


	/**
	 * Updates the store
	 * 
	 * @return void
	 */
	public function update()
	{
		
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		$storeModel = $this->storeModel;

		// check input
		$input = Input::json();
		$rules = array(
			'orderEmail'			=> 'email|required',
			'isOpen'				=> 'boolean|required',
			'allowsPaymentCash'		=> 'boolean|required',
			'allowsPaymentEc'		=> 'boolean|required',
			'allowsPaymentPaypal'	=> 'boolean|required'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// check if at least one payment method is selected
		if (!$input['allowsPaymentCash'] and !$input['allowsPaymentEc'] and !$input['allowsPaymentPaypal']) {
			return $this->respondWithStatus(400);
		}


		$storeModel->orderEmail = $input['orderEmail'];
		$storeModel->isOpen = (bool) $input['isOpen'];
		$storeModel->allowsPaymentCash = (bool) $input['allowsPaymentCash'];
		$storeModel->allowsPaymentEc = (bool) $input['allowsPaymentEc'];


		// Paypal hook
		
		if ($input['allowsPaymentPaypal'] and empty($storeModel->paymentPaypalAuthHeader)) {

			return $this->respondWithStatus(400);

		// already authorized
		} else {
			$storeModel->allowsPaymentPaypal = (bool) $input['allowsPaymentPaypal'];
		}

		$storeModel->save();

		return $storeModel->toJson(JSON_NUMERIC_CHECK);

	}

	public function updatePaypal()
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		$json = json_encode(array(
			'url' => PaypalService::getRequestPermissionUrl($this->storeModel->id)
			));

		return $json;
	}


}