<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->namespace('Api\v1')->group(static function () {

    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
    Route::get('orders-time', 'AvailabilityController@ordersTime');
    Route::get('machinesAndProcedures', 'AvailabilityController@machinesAndProcedures');

    Route::middleware(['jwt.auth'])->group(function () {
        Route::prefix('clients')->group(static function() {
            Route::get('/',                                     'ClientsController@index');
            Route::get('/history',                              'ClientsController@history');
            Route::post('/',                                    'ClientsController@store');
            Route::post('/{clientId}',                          'ClientsController@update')->name('update');
            Route::delete('{clientId}',                         'ClientsController@destroy')->name('destroy');
            Route::get('/findClient/{query?}',                  'ClientsController@findClient')->name('findClient');
        });

        Route::prefix('machines-and-procedures')->group(static function() {
            Route::get('/',                                     'MachinesAndProceduresController@index');
            Route::get('/history',                              'MachinesAndProceduresController@history');
            Route::post('/',                                    'MachinesAndProceduresController@store');
            Route::post('/{machinesAndProcedureId}',            'MachinesAndProceduresController@update')->name('update');
            Route::delete('{machinesAndProcedureId}',           'MachinesAndProceduresController@destroy')->name('destroy');
        });

        Route::prefix('orders')->group(static function() {
            Route::get('/',                                     'OrdersController@index');
            Route::post('/',                                    'OrdersController@store');
            Route::post('/{orderId}',                           'OrdersController@update')->name('update');
            Route::delete('{orderId}',                          'OrdersController@destroy')->name('destroy');
            Route::get('/findOrder/{query?}',                   'OrdersController@findOrder')->name('findOrder');

        });
    });
});

