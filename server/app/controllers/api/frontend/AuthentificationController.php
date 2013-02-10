<?php namespace App\Controllers\Api\Frontend;

use Input;
use Validator;
use ClientModel;
use Hash;
use Cache;



class AuthentificationController extends ApiController
{

    /**
     * Just wraps the getClientModelIdFromToken method and suppresses output
     * 
     * @return Response
     */
    public function checkToken()
    {
        $this->getClientModelIdFromToken();
    }


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

        // search client
        $clientModel = ClientModel::where('number', $number)->first();

        if (!$clientModel) {
            $this->error(404);
        }

        // check password
        $passwordMatched = Hash::check($password, $clientModel->password);

        if (!$passwordMatched) {
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


}