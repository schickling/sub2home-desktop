<?php

use App\Exceptions\NotAuthentificatedException;
use App\Exceptions\ModelException;
use App\Exceptions\NotFoundException;

/*
|--------------------------------------------------------------------------
| Register The Laravel Class Loader
|--------------------------------------------------------------------------
|
| In addition to using Composer, you may use the Laravel class loader to
| load your controllers and models. This is useful for keeping all of
| your classes in the "global" namespace without Composer updating.
|
*/

ClassLoader::addDirectories(array(

	app_path().'/controllers',
	app_path().'/models',
	app_path().'/database/seeds',

));

/*
|--------------------------------------------------------------------------
| Application Error Logger
|--------------------------------------------------------------------------
|
| Here we will configure the error logger setup for the application which
| is built on top of the wonderful Monolog library. By default we will
| build a rotating log file setup which creates a new file each day.
|
*/

$logFile = 'log-'.php_sapi_name().'.log';

Log::useDailyFiles(__DIR__.'/../storage/logs/'.$logFile);

/*
|--------------------------------------------------------------------------
| Application Error Handler
|--------------------------------------------------------------------------
|
| Here you may handle any errors that occur in your application, including
| logging them or displaying custom views for specific errors. You may
| even register several error handlers to handle different types of
| exceptions. If nothing is returned, the default error view is
| shown, which includes a detailed stack trace during debug.
|
*/

App::error(function(ModelException $exception, $code)
{
	Log::error($exception);
});


// TODO check and remove
App::error(function(Exception $exception, $code)
{
	Log::error($exception);
});


App::error(function(NotAuthentificatedException $exception, $code)
{
	return Response::make('Not authentificated', 401);
});

App::error(function(NotFoundException $exception, $code)
{
	return Response::make('Not found', 404);
});

/*
|--------------------------------------------------------------------------
| Require The Filters File
|--------------------------------------------------------------------------
|
| Next we will load the filters file for the application. This gives us
| a nice separate location to store our route and application filter
| definitions instead of putting them all in the main routes file.
|
*/

// not needed until now
// require __DIR__.'/../filters.php';


/*
|--------------------------------------------------------------------------
| Extend Validator
|--------------------------------------------------------------------------
|
*/

Validator::extend('boolean', function($attribute, $value, $parameters)
{
    return is_bool($value) or is_numeric($value);
});