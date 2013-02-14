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
			$this->error(404);
		}

		if ($this->hasToken() && $storeModel->clientModel->id == $this->getClientModelIdFromToken()) {

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
		$this->checkAuthentification();

		$storeModel = $this->storeModel;

		$input = Input::json();

		$rules = array(
			'orderEmail'			=> 'email|required',
			'isOpen'				=> 'boolean|required',
			'allowsPaymentCash'		=> 'boolean|required',
			'allowsPaymentEc'		=> 'boolean|required',
			'allowsPaymentPaypal'	=> 'boolean|required',
			'latitude'				=> 'numeric|required',
			'longitude'				=> 'numeric|required'
			);

		$validator = Validator::make(get_object_vars($input), $rules);

		if ($validator->fails()) {
			$this->error(400, $validator->messages());
		}


		$storeModel->description = $input->description;
		$storeModel->orderEmail = $input->orderEmail;
		$storeModel->isOpen = (bool) $input->isOpen;
		$storeModel->allowsPaymentCash = (bool) $input->allowsPaymentCash;
		$storeModel->allowsPaymentEc = (bool) $input->allowsPaymentEc;
		$storeModel->latitude = $input->latitude;
		$storeModel->longitude = $input->longitude;


		// Paypal hook
		
		if ($input->allowsPaymentPaypal && (empty($storeModel->paypalToken) || empty($storeModel->paypalTokensecret))) {

			$this->error(400);

		// already authorized
		} else {
			$storeModel->allowsPaymentPaypal = (bool) $input->allowsPaymentPaypal;
		}

		$storeModel->save();

		return $storeModel->toJson(JSON_NUMERIC_CHECK);

	}

	public function updatePaypal()
	{
		$this->loadStoreModel();
		$this->checkAuthentification();

		return PaypalService::getRequestPermissionUrl($this->storeModel->id);
	}


}