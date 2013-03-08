<?php namespace App\Controllers\Jobs\Mail;

use App\Controllers\Jobs\BaseJob;
use Exception;
use Mail;

use App\Models\ClientModel;

class SendClientCreatedMailJob extends BaseJob {

	private $clientModel;

	protected function run()
	{
		$client_model_id = $this->data['client_model_id'];
		$this->clientModel = ClientModel::find($client_model_id);

		if ($this->clientModel == null) {
			throw new Exception('No such client found');
		}

		$this->sendMail();

	}

	private function sendMail()
	{
		$addressModel = $this->clientModel->addressModel;
		$emailAddress = $addressModel->email;
		$name = $addressModel->title;

		$data = array();

		Mail::send('emails.client.created', $data, function($mail) use ($emailAddress, $name)
		{
			$mail->from('hallo@sub2home.de', 'sub2home');
			$mail->to($emailAddress, $name);
			$mail->subject('Herzlich Willkommen');
		});
	}


}