<?php namespace App\Controllers\Api\Frontend\Authentification;

use Input;
use Request;
use Hash;
use Cache;
use App\Models\ClientModel;


class LoginController extends ApiController
{

    // number of how many failed attempts are allowed
	private $limitOfFailedAttempts = 5;

    // periode how long a token is valid
    private $periodOfValidity = 4320; // 3 days

    /**
     * Logs in a user and stores the generated token in the cache
     * 
     * @return Response
     */
    public function route()
    {   
        // validate input
        $input = Input::all();

    	$rules = array(
    		'number'	=> 'numeric|between:1000,9999|required',
    		'password'	=> 'min:8|required'
    		);

    	$this->validateInput($rules);
        
        $number = $input['number'];
        $password = $input['password'];


        // check for failed attempts
    	$ip = Request::getClientIp();
    	$cacheKey = 'attempt_' . $number . '_from_' . $ip;
    	$numberOfFailedAttempts = Cache::get($cacheKey, 0);

    	if ($numberOfFailedAttempts >= $this->limitOfFailedAttempts) {

    		$exponentialWaitingTime = (int) pow(1.5, $numberOfFailedAttempts);
    		Cache::put($cacheKey, $numberOfFailedAttempts, $exponentialWaitingTime);

    		$this->throwException(429);
    	}


        // search client
    	$clientModel = ClientModel::where('number', $number)->first();

        $this->checkModelFound($clientModel);

        // check password
    	$passwordMatched = Hash::check($password, $clientModel->hashedPassword);

    	if (!$passwordMatched) {
            // cache failed attempt to prevent brute forcing
    		$numberOfFailedAttempts++;
    		Cache::put($cacheKey, $numberOfFailedAttempts, 1);

    		$this->throwException(401);
    	}


        // create, cache and return token
        $token = md5(uniqid($clientModel->id, true)); // token is unique

        // use token as key and client model id as value
        Cache::put($token, $clientModel->id, $this->periodOfValidity);


        $json = json_encode(array(
            'token' => $token
            ));


        return $this->respond(200, $json);

    }


}