<?php

/*
|--------------------------------------------------------------------------
| API Frontend Routes (non secure)
|--------------------------------------------------------------------------
*/

// stores
Route::get('api/frontend/stores', 										'App\Controllers\Api\Frontend\StoresController@index');
Route::get('api/frontend/stores/{alias}',								'App\Controllers\Api\Frontend\StoresController@show');

// categories
Route::get('api/frontend/stores/{alias}/categories',					'App\Controllers\Api\Frontend\CategoriesController@index');

// articles
Route::get('api/frontend/stores/{alias}/articles/{id}',					'App\Controllers\Api\Frontend\ArticlesController@show');

// menu bundles
Route::get('api/frontend/stores/{alias}/menubundles/{id}',				'App\Controllers\Api\Frontend\MenuBundlesController@show');

// orders
Route::post('api/frontend/stores/{alias}/orders', 						'App\Controllers\Api\Frontend\OrderCreateController@create');



/*
|--------------------------------------------------------------------------
| API Frontend Routes (secure)
|--------------------------------------------------------------------------
*/

Route::group(array('https'), function()
{
	// stores
	Route::get('api/frontend/stores/{alias}/updatepaypal',				'App\Controllers\Api\Frontend\StoresController@updatePaypal');
	Route::put('api/frontend/stores/{alias}',							'App\Controllers\Api\Frontend\StoresController@update');

	// articles
	Route::put('api/frontend/stores/{alias}/articles/{id}',				'App\Controllers\Api\Frontend\ArticlesController@update');

	// delivery areas
	Route::post('api/frontend/stores/{alias}/deliveryareas', 			'App\Controllers\Api\Frontend\DeliveryAreasController@create');
	Route::put('api/frontend/stores/{alias}/deliveryareas/{id}', 		'App\Controllers\Api\Frontend\DeliveryAreasController@update');
	Route::delete('api/frontend/stores/{alias}/deliveryareas/{id}', 	'App\Controllers\Api\Frontend\DeliveryAreasController@destroy');

	// delivery times
	Route::post('api/frontend/stores/{alias}/deliverytimes', 			'App\Controllers\Api\Frontend\DeliveryTimesController@create');
	Route::put('api/frontend/stores/{alias}/deliverytimes/{id}', 		'App\Controllers\Api\Frontend\DeliveryTimesController@update');
	Route::delete('api/frontend/stores/{alias}/deliverytimes/{id}', 	'App\Controllers\Api\Frontend\DeliveryTimesController@destroy');

	// ingredient categories
	Route::get('api/frontend/stores/{alias}/ingredientcategories',		'App\Controllers\Api\Frontend\IngredientCategoriesController@index');
	Route::put('api/frontend/stores/{alias}/ingredientcategories/{id}',	'App\Controllers\Api\Frontend\IngredientCategoriesController@update');

	// menus (menu bundles + menu upgrades)
	Route::get('api/frontend/stores/{alias}/menus',						'App\Controllers\Api\Frontend\MenusController@index');
	Route::put('api/frontend/stores/{alias}/menus/{id}',				'App\Controllers\Api\Frontend\MenusController@update');

	// invoices
	Route::get('api/frontend/stores/{alias}/invoices', 					'App\Controllers\Api\Frontend\InvoicesController@index');

	// orders
	Route::get('api/frontend/stores/{alias}/orders', 					'App\Controllers\Api\Frontend\OrderIndexController@index');
	Route::get('api/frontend/stores/{alias}/orders/{id}', 				'App\Controllers\Api\Frontend\OrderShowController@show');
	Route::post('api/frontend/stores/{alias}/testorder', 				'App\Controllers\Api\Frontend\OrderTestOrderController@create');

	// addresses
	Route::put('api/frontend/stores/{alias}/addresses/{id}', 			'App\Controllers\Api\Frontend\AddressesController@update');

	// bankaccounts
	Route::put('api/frontend/bankaccounts/{id}', 						'App\Controllers\Api\Frontend\BankaccountsController@update');

	// clients
	Route::get('api/frontend/clients',						 			'App\Controllers\Api\Frontend\ClientsController@show');
	Route::post('api/frontend/clients/changepassword',		 			'App\Controllers\Api\Frontend\ClientsController@changePassword');

	// authentification
	Route::post('api/frontend/login',									'App\Controllers\Api\Frontend\AuthentificationController@login');
	Route::post('api/frontend/logout',									'App\Controllers\Api\Frontend\AuthentificationController@logout');
	Route::post('api/frontend/checktoken',								'App\Controllers\Api\Frontend\AuthentificationController@checkToken');
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


