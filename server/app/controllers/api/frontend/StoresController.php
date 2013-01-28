<?php namespace App\Controllers\Api\Frontend;

use StoreModel;
use DeliveryAreaModel;
use DeliveryTimeModel;
use Input;

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
		$storeModel = StoreModel::with(array('deliveryAreasCollection', 'deliveryTimesCollection', 'addressModel'))
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
				'user_model_id'
				)));

		} else {

			$storeModel->setHidden((array(
				'paypalToken',
				'paypalTokensecret',
				'created_at',
				'updated_at',
				'isActive',
				'user_model_id',
				'totalTurnover',
				'orderEmail',
				'id'
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
		
		// storeModel description
		$storeModel->description = $input->description;
		
		// isOpen status
		$storeModel->isOpen = $input->isOpen;

		var_dump($storeModel->toArray());

		// order mail adress
		$storeModel->orderEmail = $input->orderEmail;

		// payment methods
		$storeModel->allowsPaymentCash = $input->allowsPaymentCash;
		$storeModel->allowsPaymentEc = $input->allowsPaymentEc;


		// Paypal hook
		
		// // get paypal authorization
		// if ($input->payment_paypal && (empty($storeModel->paypal_token) || empty($storeModel->paypal_tokensecret))) {

		// 	$paypal_controller = IoC::resolve('payment_paypal');
		// 	$url = $paypal_controller->request_permissions($storeModel->id);

		// 	// Returns the URL to the permission form
		// 	return Response::make($url, 300);

		// // already authorized
		// } else {
		// 	$storeModel->payment_paypal = $input->payment_paypal;
		// }

		$storeModel->save();

	}


}