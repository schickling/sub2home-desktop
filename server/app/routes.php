<?php

/*
|--------------------------------------------------------------------------
| API Frontend Routes (customer)
|--------------------------------------------------------------------------
*/

// stores
Route::get('api/frontend/stores', 										'App\Controllers\Api\Frontend\Customer\Stores\IndexController@route');
Route::get('api/frontend/stores/{alias}',								'App\Controllers\Api\Frontend\Customer\Stores\ShowController@route');

// categories
Route::get('api/frontend/stores/{alias}/categories',					'App\Controllers\Api\Frontend\Customer\Categories\IndexController@route');

// articles (relation to store needed because of custom items)
Route::get('api/frontend/stores/{alias}/articles/{id}',					'App\Controllers\Api\Frontend\Customer\Articles\ShowController@route');

// menu bundles (relation to store needed because of custom items)
Route::get('api/frontend/stores/{alias}/menubundles/{id}',				'App\Controllers\Api\Frontend\Customer\MenuBundles\ShowController@route');

// orders
Route::post('api/frontend/stores/{alias}/orders', 						'App\Controllers\Api\Frontend\Customer\Orders\CreateController@route');


/*
|--------------------------------------------------------------------------
| API Frontend Routes (client)
|--------------------------------------------------------------------------
*/

Route::group(array('https'), function()
{
	// stores
	Route::get('api/frontend/stores/{alias}/auth',						'App\Controllers\Api\Frontend\Client\Stores\ShowController@route');
	Route::get('api/frontend/stores/{alias}/updatepaypal',				'App\Controllers\Api\Frontend\Client\Stores\UpdatePaypalController@route');
	Route::put('api/frontend/stores/{alias}',							'App\Controllers\Api\Frontend\Client\Stores\UpdateController@route');

	// articles (relation to store needed because of custom items)
	Route::put('api/frontend/stores/{alias}/articles/{id}',				'App\Controllers\Api\Frontend\Client\Articles\UpdateController@route');

	// delivery areas
	Route::post('api/frontend/stores/{alias}/deliveryareas', 			'App\Controllers\Api\Frontend\Client\DeliveryAreas\CreateController@route');
	Route::put('api/frontend/deliveryareas/{id}',				 		'App\Controllers\Api\Frontend\Client\DeliveryAreas\UpdateController@route');
	Route::delete('api/frontend/deliveryareas/{id}',				 	'App\Controllers\Api\Frontend\Client\DeliveryAreas\DestroyController@route');

	// delivery times
	Route::post('api/frontend/stores/{alias}/deliverytimes', 			'App\Controllers\Api\Frontend\Client\DeliveryTimes\CreateController@route');
	Route::put('api/frontend/deliverytimes/{id}', 						'App\Controllers\Api\Frontend\Client\DeliveryTimes\UpdateController@route');
	Route::delete('api/frontend/deliverytimes/{id}', 					'App\Controllers\Api\Frontend\Client\DeliveryTimes\DestroyController@route');

	// categories
	Route::get('api/frontend/stores/{alias}/categories/assortment',		'App\Controllers\Api\Frontend\Client\Categories\IndexController@route');

	// ingredient categories
	Route::get('api/frontend/stores/{alias}/ingredientcategories',		'App\Controllers\Api\Frontend\Client\IngredientCategories\IndexController@route');

	// ingredients (relation to store needed because of custom items)
	Route::put('api/frontend/stores/{alias}/ingredients/{id}',			'App\Controllers\Api\Frontend\Client\Ingredients\UpdateController@route');

	// menus bundles (relation to store needed because of custom items)
	Route::get('api/frontend/stores/{alias}/menubundles',				'App\Controllers\Api\Frontend\Client\MenuBundles\IndexController@route');
	Route::put('api/frontend/stores/{alias}/menubundles/{id}',			'App\Controllers\Api\Frontend\Client\MenuBundles\UpdateController@route');

	// menus upgrades (relation to store needed because of custom items)
	Route::get('api/frontend/stores/{alias}/menuupgrades',				'App\Controllers\Api\Frontend\Client\MenuUpgrades\IndexController@route');
	Route::put('api/frontend/stores/{alias}/menuupgrades/{id}',			'App\Controllers\Api\Frontend\Client\MenuUpgrades\UpdateController@route');

	// orders
	Route::get('api/frontend/stores/{alias}/orders', 					'App\Controllers\Api\Frontend\Client\Orders\IndexController@route');
	Route::get('api/frontend/orders/{id}', 								'App\Controllers\Api\Frontend\Client\Orders\ShowController@route');
	Route::post('api/frontend/stores/{alias}/testorder', 				'App\Controllers\Api\Frontend\Client\Orders\TestOrderController@route');

	// addresses
	Route::put('api/frontend/addresses/{id}', 							'App\Controllers\Api\Frontend\Client\Addresses\UpdateController@route');

	// bankaccounts
	Route::put('api/frontend/bankaccounts/{id}', 						'App\Controllers\Api\Frontend\Client\Bankaccounts\UpdateController@route');

	// clients
	Route::get('api/frontend/clients',						 			'App\Controllers\Api\Frontend\Client\Clients\ShowController@route');
	Route::post('api/frontend/clients/changepassword',		 			'App\Controllers\Api\Frontend\Client\Clients\ChangePasswordController@route');
});



/*
|--------------------------------------------------------------------------
| API Frontend Authentification
|--------------------------------------------------------------------------
*/

Route::group(array('https'), function()
{
	// authentification
	Route::post('api/frontend/login',									'App\Controllers\Api\Frontend\Authentification\LoginController@route');
	Route::post('api/frontend/logout',									'App\Controllers\Api\Frontend\Authentification\LogoutController@route');
	Route::post('api/frontend/checktoken',								'App\Controllers\Api\Frontend\Authentification\CheckTokenController@route');
});



/*
|--------------------------------------------------------------------------
| API Services Routes (secure)
|--------------------------------------------------------------------------
*/

Route::group(array('https'), function()
{
	// paypal
	Route::get('api/services/paypal/savetoken',							'App\Controllers\Api\Services\PaypalController@saveToken');
	Route::get('api/services/paypal/confirmorder',						'App\Controllers\Api\Services\PaypalController@confirmOrder');
	Route::get('api/services/paypal/notify',							'App\Controllers\Api\Services\PaypalController@notify');
});



/*
|--------------------------------------------------------------------------
| API Backend Routes (secure)
|--------------------------------------------------------------------------
*/

Route::group(array('https'), function()
{
	// enable OPTIONS request
	Route::options('api/backend/{resource}/{id}', 						'App\Controllers\Api\Backend\ApiController@options');

	// clients
	Route::get('api/backend/clients', 									'App\Controllers\Api\Backend\ClientsController@index');
	Route::post('api/backend/clients',									'App\Controllers\Api\Backend\ClientsController@create');
	Route::put('api/backend/clients/{id}', 								'App\Controllers\Api\Backend\ClientsController@update');
	Route::delete('api/backend/clients/{id}', 							'App\Controllers\Api\Backend\ClientsController@destroy');
	Route::options('api/backend/clients/{id}/changepassword', 			'App\Controllers\Api\Backend\ClientsController@options');
	Route::post('api/backend/clients/{id}/changepassword',				'App\Controllers\Api\Backend\ClientsController@changePassword');

	// addresses
	Route::put('api/backend/addresses/{id}', 							'App\Controllers\Api\Backend\AddressesController@update');

	// stores
	Route::post('api/backend/stores', 									'App\Controllers\Api\Backend\StoresController@create');
	Route::put('api/backend/stores/{id}', 								'App\Controllers\Api\Backend\StoresController@update');
	Route::delete('api/backend/stores/{id}', 							'App\Controllers\Api\Backend\StoresController@destroy');

	// authentification
	Route::post('api/backend/login',									'App\Controllers\Api\Backend\AuthentificationController@login');
	Route::post('api/backend/logout',									'App\Controllers\Api\Backend\AuthentificationController@logout');
	Route::post('api/backend/checktoken',								'App\Controllers\Api\Backend\AuthentificationController@checkToken');
});


