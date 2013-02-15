<?php namespace App\Controllers\Api\Frontend;

use Input;
use Request;
use Validator;
use Hash;
use Cache;

use App\Models\ClientModel;



class AuthentificationController extends ApiController
{

    /**
     * Logs in a user and stores the generated token in the cache
     * 
     * @return Response
     */
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
            'number'	=> 'numeric|between:1,999|required',
            'password'	=> 'min:1|required'
            );

        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            $this->error(400, $validator->messages());
        }



        // check for failed attempts
        $ip = Request::getClientIp();
        $cacheKey = 'attempt_' . $number . '_from_' . $ip;
        $numberOfFailedAttempts = Cache::get($cacheKey, 0);

        if ($numberOfFailedAttempts > 2) {

            $numberOfFailedAttempts++;
            $exponentialWaitingTime = (int) pow(1.5, $numberOfFailedAttempts);
            Cache::put($cacheKey, $numberOfFailedAttempts, $exponentialWaitingTime);

            $this->error(429, $exponentialWaitingTime);

        }



        // search client
        $clientModel = ClientModel::where('number', $number)->first();

        if (!$clientModel) {

            $this->error(404);
        }


        // check password
        $passwordMatched = Hash::check($password, $clientModel->password);

        if (!$passwordMatched) {
            // cache failed attempt to prevent brute forcing
            $numberOfFailedAttempts++;
            Cache::put($cacheKey, $numberOfFailedAttempts, 1);

            $this->error(401);
        }



        // create, cache and return token
        $token = md5(uniqid($clientModel->id, true)); // token is unique

        // use token as key and client model id as value
        Cache::put($token, $clientModel->id, 3 * 24 * 60); // 3 days


        return $token;

    }

    public function logout()
    {
        $token = Request::header('Token');

        if ($token) {
            Cache::forget($token);
        } else {
            $this->error(401);
        }

    }

    /**
     * Just wraps the getClientModelIdFromToken method and suppresses output
     * 
     * @return Response
     */
    public function checkToken()
    {
        $this->getClientModelIdFromToken();
    }


}