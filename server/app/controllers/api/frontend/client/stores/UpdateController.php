<?php namespace App\Controllers\Api\Frontend\Client\Stores;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use Input;
use Validator;


/**
* 
*/
class UpdateController extends StoreRelatedApiController
{

	/**
	 * @PUT('api/frontend/stores/{alias}')
	 */
	public function route()
	{

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

		$this->validate($input, $rules);

		// check if at least one payment method is selected
		if (!$input['allowsPaymentCash'] and !$input['allowsPaymentEc'] and !$input['allowsPaymentPaypal']) {
			$this->throwException(400);
		}


		$storeModel->orderEmail = $input['orderEmail'];
		$storeModel->isOpen = (bool) $input['isOpen'];
		$storeModel->allowsPaymentCash = (bool) $input['allowsPaymentCash'];
		$storeModel->allowsPaymentEc = (bool) $input['allowsPaymentEc'];


		// Paypal hook
		
		if ($input['allowsPaymentPaypal'] and empty($storeModel->paymentPaypalAuthHeader)) {

			$this->throwException(400);

		// already authorized
		} else {
			$storeModel->allowsPaymentPaypal = (bool) $input['allowsPaymentPaypal'];
		}

		$storeModel->save();

		return $this->respond(204);

	}


}