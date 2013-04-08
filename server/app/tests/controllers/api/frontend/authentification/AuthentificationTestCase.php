<?php namespace App\Tests\Controllers\Api\Frontend\Authentification;

use App\Tests\Controllers\Api\ApiTestCase;
use Hash;
use App\Models\ClientModel;


abstract class AuthentificationTestCase extends ApiTestCase {

	protected $loadMigrations = true;

	// test data
	const CORRECT_PASSWORD = 'superSecure';
	const WRONG_PASSWORD = 'supersecure';
	const TOO_SHORT_PASSWORD = 'short';
	const CORRECT_NUMBER = 7777;
	const WRONG_NUMBER = 7776;

	protected function seedDatabase()
	{
		$clientModel = new ClientModel(array(
			'number' => self::CORRECT_NUMBER,
			'hashedPassword' => Hash::make(self::CORRECT_PASSWORD)
			));
		$clientModel->save();

	}

	/*
	 * helper methods
	 */
	
	protected function getTokenOfSuccessfulLogin()
	{
		$loginFormData = array(
			'number' => self::CORRECT_NUMBER,
			'password' => self::CORRECT_PASSWORD
			);

		$this->setFormData($loginFormData);
		$this->callAction();

		$this->assertResponseOk();

		$decodedResponse = $this->getDecodedContent();

		return $decodedResponse->token;
	}

}