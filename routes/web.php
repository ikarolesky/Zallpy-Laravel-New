<?php

use Illuminate\Support\Facades\Route;

Route::get('{any}', function () {
    return view('app'); // Carrega o React
})->where('any', '.*');
