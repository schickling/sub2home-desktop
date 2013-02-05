<?php

/**
* Cash Payment controller
*/
class Payment_Cash_Controller implements Payment_Interface

	public function pay($order = null)
	{
		return true;
	}
}