<?php

Route::get('/', function () {
    return view("bootstrap");
});


Route::group(['middleware' => 'cors'], function () {
    Route::post("/angular2login", 'UserController@login');
});

Route::get('/token', array('middleware' => ['cors', 'jwt.auth'], function() {
    if ( ! $user = \JWTAuth::parseToken()->authenticate() ) {
        return response()->json(['User Not Found'], 404);
    }

    $user = \JWTAuth::parseToken()->authenticate();
    return response()->json(['email' => $user->email], 200);
}));

Route::group(['middleware' => ['web']], function () {
    //
});

Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/home', 'HomeController@index');
});
