<?php namespace App\Controllers\Api\Backend;

use Config;

/**
* 
*/
class AuthentificationController extends ApiController
{
	public function login()
	{   
        // validate input
		$number = Input::get('number');
		$password = Input::get('password');

		$input = array(
			'number'	=> $number,
			'password'	=> $password
			);

		$rules = array(
			'number'	=> 'numeric|between:1000,9999|required',
			'password'	=> 'min:1|required'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(401);
		}



        // check for failed attempts
		$ip = Request::getClientIp();
		$cacheKey = 'attempt_' . $number . '_from_' . $ip;
		$numberOfFailedAttempts = Cache::get($cacheKey, 0);

		if ($numberOfFailedAttempts > $this->toleranceOfFailedAttempts) {

			$numberOfFailedAttempts++;
			$exponentialWaitingTime = (int) pow(1.5, $numberOfFailedAttempts);
			Cache::put($cacheKey, $numberOfFailedAttempts, $exponentialWaitingTime);

			return $this->respondWithStatus(429, $exponentialWaitingTime);

		}



        // search client
		$clientModel = ClientModel::where('number', $number)->first();

		if (!$clientModel) {
			return $this->respondWithStatus(404);
		}


        // check password
		$passwordMatched = Hash::check($password, $clientModel->hashedPassword);

		if (!$passwordMatched) {
            // cache failed attempt to prevent brute forcing
			$numberOfFailedAttempts++;
			Cache::put($cacheKey, $numberOfFailedAttempts, 1);

			return $this->respondWithStatus(401);
		}



        // create, cache and return token
        $token = md5(uniqid($clientModel->id, true)); // token is unique

        // use token as key and client model id as value
        Cache::put($token, $clientModel->id, $this->periodOfValidity);


        $responseArray = array('token' => $token);

        return json_encode($responseArray);

    }

}