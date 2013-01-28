<?php

/*
|--------------------------------------------------------------------------
| API Frontend Routes
|--------------------------------------------------------------------------
*/

// stores
Route::get('api/frontend/stores', 										'App\Controllers\Api\Frontend\StoresController@index');
Route::get('api/frontend/stores/{alias}',								'App\Controllers\Api\Frontend\StoresController@show');
Route::put('api/frontend/stores/{alias}',								'App\Controllers\Api\Frontend\StoresController@update');

// categories
Route::get('api/frontend/stores/{alias}/categories',					'App\Controllers\Api\Frontend\CategoriesController@index');

// articles
Route::get('api/frontend/stores/{alias}/articles/{id}',					'App\Controllers\Api\Frontend\ArticlesController@show');

// delivery areas
Route::post('api/frontend/stores/{alias}/deliveryareas', 				'App\Controllers\Api\Frontend\DeliveryAreasController@create');
Route::put('api/frontend/stores/{alias}/deliveryareas/{id}', 			'App\Controllers\Api\Frontend\DeliveryAreasController@update');
Route::delete('api/frontend/stores/{alias}/deliveryareas/{id}', 		'App\Controllers\Api\Frontend\DeliveryAreasController@destroy');

// delivery times
Route::post('api/frontend/stores/{alias}/deliverytimes', 				'App\Controllers\Api\Frontend\DeliveryTimesController@create');
Route::put('api/frontend/stores/{alias}/deliverytimes/{id}', 			'App\Controllers\Api\Frontend\DeliveryTimesController@update');
Route::delete('api/frontend/stores/{alias}/deliverytimes/{id}', 		'App\Controllers\Api\Frontend\DeliveryTimesController@destroy');



/*
|--------------------------------------------------------------------------
| API Backend Routes
|--------------------------------------------------------------------------
*/

Route::get('api/backend/clients', 										'App\Controllers\Api\Backend\ClientsController@index');