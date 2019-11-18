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

//TODO: middleware

Route::prefix('v1')->namespace('Api\v1')->group(static function () {

    //TODO: implement me pls
//    Route::prefix('login')->group(static function() {
//        Route::post('/', '');
//    });

    Route::prefix('clients')->group(static function() {
        Route::get('/',                                     'ClientsController@index');
        Route::get('/create',                               'ClientsController@create');
        Route::get('/history',                              'ClientsController@history');
        Route::post('/',                                    'ClientsController@store');
        Route::get('/{client}/edit',                        'ClientsController@edit')->name('edit');
        Route::post('/{client}',                            'ClientsController@update')->name('update');
        Route::delete('{client}',                           'ClientsController@destroy')->name('destroy');
        Route::get('/findClient/{query?}',                  'ClientsController@findClient')->name('findClient');
    });

    Route::prefix('machines-and-procedures')->group(static function() {
        Route::get('/',                                     'MachinesAndProceduresController@index');
        Route::get('/create',                               'MachinesAndProceduresController@create');
        Route::get('/history',                              'MachinesAndProceduresController@history');
        Route::post('/',                                    'MachinesAndProceduresController@store');
        Route::get('/{machinesAndProcedure}/edit',          'MachinesAndProceduresController@edit')->name('edit');
        Route::post('/{machinesAndProcedure}',              'MachinesAndProceduresController@update')->name('update');
        Route::delete('{machinesAndProcedure}',             'MachinesAndProceduresController@destroy')->name('destroy');
    });

    Route::prefix('orders')->group(static function() {
        Route::get('/',                                     'OrdersController@index');
        Route::get('/create',                               'OrdersController@create');
        Route::post('/',                                    'OrdersController@store');
        Route::get('/{order}/edit',                         'OrdersController@edit')->name('edit');
        Route::post('/{order}',                             'OrdersController@update')->name('update');
        Route::delete('{order}',                            'OrdersController@destroy')->name('destroy');
        Route::get('/findOrder/{query?}',                   'OrdersController@findOrder')->name('findOrder');
    });

});