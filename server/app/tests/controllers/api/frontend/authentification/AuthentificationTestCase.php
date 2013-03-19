<?php namespace App\Tests\Controllers\Api\Frontend\Authentification;

use App\Tests\TestCase;
use Hash;
use App\Models\ClientModel;


class AuthentificationTestCase extends TestCase {

	protected $loadMigrations = true;

	// test data
	protected $correctPassword = 'superSecure';
	protected $wrongPassword = 'supersecure';
	protected $tooShortPassword = 'short';
	protected $correctNumber = 7777;
	protected $wrongNumber = 7776;

	protected function seedDatabase()
	{
		$clientModel = new ClientModel(array(
			'number' => $this->correctNumber,
			'hashedPassword' => Hash::make($this->correctPassword)
			));
		$clientModel->save();

	}

	/*
	 * helper methods
	 */
	
	protected function getTokenOfSuccessfulLogin()
	{
		$loginFormData = array(
			'number' => $this->correctNumber,
			'password' => $this->correctPassword
			);

		$response = $this->call('POST', $this->getUrl(), $loginFormData);
		$this->assertResponseOk();

		$decodedResponse = json_decode($response->getContent());

		return $decodedResponse->token;
	}

	private function getUrl()
	{
		return 'https://sub2home.dev/api/frontend/login';
	}

}