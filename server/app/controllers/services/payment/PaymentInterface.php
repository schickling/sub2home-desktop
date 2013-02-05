<?php namespace App\Controllers\Services\Payment;

/**
 * PaymentInterface is the interface implemented by all payment classes.
 *
 */
interface PaymentInterface
{
	/**
	 * Returns weather the order was payed
	 * 
	 * @param  object $order [description]
	 * @return bool
	 */
	public static function pay($order);
}
