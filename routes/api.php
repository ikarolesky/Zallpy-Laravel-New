<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CooperatorController;
use App\Http\Controllers\Api\AuthController;

Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);

        Route::apiResource('cooperados', CooperatorController::class);
    });
});
