<?php

/*
|--------------------------------------------------------------------------
| API Frontend Routes (non secure)
|--------------------------------------------------------------------------
*/

// stores
Route::get('api/frontend/stores', 										'App\Controllers\Api\Frontend\Customer\StoresController@index');
Route::get('api/frontend/stores/{alias}',								'App\Controllers\Api\Frontend\Customer\StoresController@show');

// categories
Route::get('api/frontend/stores/{alias}/categories',					'App\Controllers\Api\Frontend\Customer\CategoriesController@index');

// articles (relation to store needed because of custom items)
Route::get('api/frontend/stores/{alias}/articles/{id}',					'App\Controllers\Api\Frontend\Customer\ArticlesController@show');

// menu bundles (relation to store needed because of custom items)
Route::get('api/frontend/stores/{alias}/menubundles/{id}',				'App\Controllers\Api\Frontend\Customer\MenuBundlesController@show');

// orders
Route::post('api/frontend/stores/{alias}/orders', 						'App\Controllers\Api\Frontend\Customer\OrderCreateController@create');



/*
|--------------------------------------------------------------------------
| API Frontend Routes (secure)
|--------------------------------------------------------------------------
*/

Route::group(array('https'), function()
{
	// stores
	Route::get('api/frontend/stores/{alias}/updatepaypal',				'App\Controllers\Api\Frontend\Client\StoresController@updatePaypal');
	Route::put('api/frontend/stores/{alias}',							'App\Controllers\Api\Frontend\Client\StoresController@update');

	// articles (relation to store needed because of custom items)
	Route::put('api/frontend/stores/{alias}/articles/{id}',				'App\Controllers\Api\Frontend\Client\ArticlesController@update');

	// delivery areas
	Route::post('api/frontend/stores/{alias}/deliveryareas', 			'App\Controllers\Api\Frontend\Client\DeliveryAreasController@create');
	Route::put('api/frontend/deliveryareas/{id}',				 		'App\Controllers\Api\Frontend\Client\DeliveryAreasController@update');
	Route::delete('api/frontend/deliveryareas/{id}',				 	'App\Controllers\Api\Frontend\Client\DeliveryAreasController@destroy');

	// delivery times
	Route::post('api/frontend/stores/{alias}/deliverytimes', 			'App\Controllers\Api\Frontend\Client\DeliveryTimesController@create');
	Route::put('api/frontend/deliverytimes/{id}', 						'App\Controllers\Api\Frontend\Client\DeliveryTimesController@update');
	Route::delete('api/frontend/deliverytimes/{id}', 					'App\Controllers\Api\Frontend\Client\DeliveryTimesController@destroy');

	// ingredient categories
	Route::get('api/frontend/stores/{alias}/ingredientcategories',		'App\Controllers\Api\Frontend\Client\IngredientCategoriesController@index');

	// ingredients (relation to store needed because of custom items)
	Route::put('api/frontend/stores/{alias}/ingredients/{id}',			'App\Controllers\Api\Frontend\Client\IngredientsController@update');

	// menus bundles (relation to store needed because of custom items)
	Route::get('api/frontend/stores/{alias}/menubundles',				'App\Controllers\Api\Frontend\Client\MenuBundlesController@index');
	Route::put('api/frontend/stores/{alias}/menubundles/{id}',			'App\Controllers\Api\Frontend\Client\MenuBundlesController@update');

	// menus upgrades (relation to store needed because of custom items)
	Route::get('api/frontend/stores/{alias}/menuupgrades',				'App\Controllers\Api\Frontend\Client\MenuUpgradesController@index');
	Route::put('api/frontend/stores/{alias}/menuupgrades/{id}',			'App\Controllers\Api\Frontend\Client\MenuUpgradesController@update');

	// invoices
	Route::get('api/frontend/stores/{alias}/invoices', 					'App\Controllers\Api\Frontend\Client\InvoicesController@index');

	// orders
	Route::get('api/frontend/stores/{alias}/orders', 					'App\Controllers\Api\Frontend\Client\OrderIndexController@index');
	Route::get('api/frontend/orders/{id}', 								'App\Controllers\Api\Frontend\Client\OrderShowController@show');
	Route::post('api/frontend/stores/{alias}/testorder', 				'App\Controllers\Api\Frontend\Client\OrderTestOrderController@create');

	// addresses
	Route::put('api/frontend/addresses/{id}', 							'App\Controllers\Api\Frontend\Client\AddressesController@update');

	// bankaccounts
	Route::put('api/frontend/bankaccounts/{id}', 						'App\Controllers\Api\Frontend\Client\BankaccountsController@update');

	// clients
	Route::get('api/frontend/clients',						 			'App\Controllers\Api\Frontend\Client\ClientsController@show');
	Route::post('api/frontend/clients/changepassword',		 			'App\Controllers\Api\Frontend\Client\ClientsController@changePassword');

	// authentification
	Route::post('api/frontend/login',									'App\Controllers\Api\Frontend\Client\AuthentificationController@login');
	Route::post('api/frontend/logout',									'App\Controllers\Api\Frontend\Client\AuthentificationController@logout');
	Route::post('api/frontend/checktoken',								'App\Controllers\Api\Frontend\Client\AuthentificationController@checkToken');
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


