<?php

/*
 * API FRONTEND
 */



// stores
Route::get('api/frontend/stores', 						'App\Controllers\Api\Frontend\StoresController@index');
Route::get('api/frontend/stores/{alias}',				'App\Controllers\Api\Frontend\StoresController@show');
Route::put('api/frontend/stores/{alias}',				'App\Controllers\Api\Frontend\StoresController@update');


// categories
Route::get('api/frontend/stores/{alias}/categories',	'App\Controllers\Api\Frontend\CategoriesController@index');


// articles
Route::get('api/frontend/stores/{alias}/articles/{id}',	'App\Controllers\Api\Frontend\ArticlesController@show');

