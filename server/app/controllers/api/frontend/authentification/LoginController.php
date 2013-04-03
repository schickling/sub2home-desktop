<?php namespace App\Controllers\Api\Frontend\Authentification;

use Input;
use Request;
use Hash;
use Cache;
use App\Models\ClientModel;


class LoginController extends AuthentificationController
{

	// number of how many failed attempts are allowed
	private $limitOfFailedAttempts = 5;

	// periode how long a token is valid
	private $periodOfValidity = 4320; // 3 days

	private $clientModel;

	private $token;

	/**
	 * Logs in a user and stores the generated token in the cache
	 * 
	 * @return Response
	 */
	public function route()
	{

		$this->checkInput();
		$this->checkForPreviousFailedAttempts();
		$this->findClientModel();
		$this->checkPassword();
		$this->createToken();

		$json = json_encode(array(
			'token' => $this->token
			));

		return $this->respond(200, $json);

	}

	private function checkInput()
	{
		$rules = array(
			'number'	=> 'numeric|between:1000,9999|required',
			'password'	=> 'min:8|required'
			);

		$this->validateInput($rules);
	}

	private function checkForPreviousFailedAttempts()
	{
		$numberOfFailedAttempts = $this->getNumberOfFailedAttempts();

		if ($numberOfFailedAttempts >= $this->limitOfFailedAttempts) {

			$exponentialWaitingTime = (int) pow(1.5, $numberOfFailedAttempts);
			$this->increaseNumberOfFailedAttempts($exponentialWaitingTime);

			$this->throwException(429);
		}

	}

	private function findClientModel()
	{
		$number = Input::get('number');

		$this->clientModel = ClientModel::where('number', $number)->first();
		$this->checkModelFound($this->clientModel);
	}

	private function checkPassword()
	{
		$password = Input::get('password');
		$passwordMatched = Hash::check($password, $this->clientModel->hashedPassword);

		if ( ! $passwordMatched) {

			// cache failed attempt to prevent brute forcing
			$this->increaseNumberOfFailedAttempts();

			$this->throwException(401);
		}
	}

	private function createToken()
	{
		$clientModelId = $this->clientModel->id;
		$this->token = md5(uniqid($clientModelId, true)); // token is unique

		// use token as key and client model id as value
		Cache::put($this->getCacheKeyForSession(), $clientModelId, $this->periodOfValidity);

	}

	private function getNumberOfFailedAttempts()
	{
		return Cache::get($this->getCacheKeyForFailedAttempt(), 0);
	}

	private function increaseNumberOfFailedAttempts($expirationTime = 1)
	{
		$cacheKey = $this->getCacheKeyForFailedAttempt();
		$numberOfFailedAttempts = $this->getNumberOfFailedAttempts();

		Cache::put($cacheKey, $numberOfFailedAttempts + 1, $expirationTime);
	}

	private function getCacheKeyForFailedAttempt()
	{
		$number = Input::get('number');
		$ip = Request::getClientIp();

		return sprintf('failed_login_attempt_%s_from_%s', $number, $ip);
	}

	private function getCacheKeyForSession()
	{	
		return sprintf('session_%s', $this->token);
	}

}