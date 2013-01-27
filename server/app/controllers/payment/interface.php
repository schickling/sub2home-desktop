<?php

/**
 * PaymentInterface is the interface implemented by all payment classes.
 *
 */
interface Payment_Interface
{
	/**
	 * Returns weather the order was payed
	 * 
	 * @param  object $order [description]
	 * @return bool
	 */
	function pay($order);
}
