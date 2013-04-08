<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\BaseJob;
use Mail;
use Log;

abstract class BaseMailJob extends BaseJob {

	protected $receiverMail;
	protected $receiverName;
	protected $senderMail;
	protected $senderName;
	protected $subject;
	protected $viewName;
	protected $viewData;

	protected function run()
	{
		$this->prepareData();
		$this->sendMail();
		$this->logMail();
	}

	abstract protected function prepareData();

	private function sendMail()
	{
		Mail::send($this->viewName, $this->viewData, function($mail)
		{
			$mail->from($this->senderMail, $this->senderName);
			$mail->to($this->receiverMail, $this->receiverName);
			$mail->subject($this->subject);
			$mail->setCharset('UTF-8');
		});		
	}

	private function logMail()
	{
		$message = sprintf('Email was sent to %s from %s with subject: "%s"', $this->receiverMail, $this->senderMail, $this->subject);

		Log::info($message);
	}


}