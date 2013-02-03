<?php namespace App\Controllers\Api\Frontend;

use OrderModel;
use AddressModel;
use Input;

/**
* 
*/
class OrderController extends ApiController
{


	public function create()
	{
		// prepare
		$this->loadStoreModel();
		$input = Input::json();
		$orderModel = new OrderModel();


		// parse ordered items
		// $orderModel->orderedItemsCollection = $this->createOrderedItemsCollection($input->orderedItemsCollection);

		// recalculate and compare totals
		$orderModel->calculateTotal();

		if ($orderModel->total != $input->total) {
			$this->error(400);
		}

		// save other order data
		$orderModel->paymentMethod = $input->paymentMethod;
		$orderModel->isDelivered = false;
		$orderModel->credit = $input->credit;
		$orderModel->store_model_id = $this->storeModel->id;

		// save order
		$orderModel->save();


		// save address
		$addressModel = $this->createAddressModel($input->addressModel);
		$orderModel->addressModel()->save($addressModel);
		

		var_dump($input);
	}


	private function createOrderedItemsCollection($orderedItems)
	{
		$orderedItemsCollection = new Collection();

		foreach ($orderedItems as $orderedItem) {
			$orderedItemModel = new OrderedItemModel();

			$orderedItemsCollection->add($orderedItemModel);
		}

		return $orderedItemsCollection;
	}


	private function recalculateTotal($orderedItemsCollection)
	{
		# code...
	}


	private function createAddressModel($address)
	{
		$addressModel = new AddressModel();

		$addressModel->firstName = $address->firstName;
		$addressModel->lastName = $address->lastName;
		$addressModel->street = $address->street;
		$addressModel->streetAdditional = $address->streetAdditional;
		$addressModel->postal = $address->postal;
		$addressModel->city = $address->city;
		$addressModel->email = $address->email;
		$addressModel->phone = $address->phone;

		return $addressModel;
	}


}