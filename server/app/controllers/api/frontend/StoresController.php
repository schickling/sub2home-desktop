<?php namespace App\Controllers\Api\Frontend;

use StoreModel;
use DeliveryAreaModel;
use DeliveryTimeModel;
use Input;
use Response;
use Validator;
use PaypalService;

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
			$this->error(404);
		}

		if ($this->isAuthenicatedClient()) {

			$storeModel->setHidden((array(
				'paypalToken',
				'paypalTokensecret',
				'created_at',
				'updated_at',
				'isActive',
				'client_model_id'
				)));

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
		$storeModel = $this->storeModel;

		$input = Input::json();

		$rules = array(
			'orderEmail'			=> 'email|required',
			'isOpen'				=> 'boolean|required',
			'allowsPaymentCash'		=> 'boolean|required',
			'allowsPaymentEc'		=> 'boolean|required',
			'allowsPaymentPaypal'	=> 'boolean|required'
			);

		// var_dump(get_object_vars($input));

		$validator = Validator::make(get_object_vars($input), $rules);

		if ($validator->fails()) {
			$this->error(400, $validator->messages());
		}


		$storeModel->description = $input->description;
		$storeModel->orderEmail = $input->orderEmail;
		$storeModel->isOpen = (bool) $input->isOpen;
		$storeModel->allowsPaymentCash = (bool) $input->allowsPaymentCash;
		$storeModel->allowsPaymentEc = (bool) $input->allowsPaymentEc;


		// Paypal hook
		
		if ($input->allowsPaymentPaypal && (empty($storeModel->paypalToken) || empty($storeModel->paypalTokensecret))) {

			// get paypal authorization
			$url = PaypalService::getRequestPermissionUrl($storeModel->id);

			// Returns the URL to the permission form
			return Response::make($url, 300);

		// already authorized
		} else {
			$storeModel->allowsPaymentPaypal = (bool) $input->allowsPaymentPaypal;
		}

		$storeModel->save();

		return $storeModel->toJson(JSON_NUMERIC_CHECK);

	}


}