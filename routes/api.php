<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CooperatorController;
use App\Http\Controllers\AuthController;

Route::prefix('v1')->group(function () {
    Route::get('/cooperators', [CooperatorController::class, 'index']);
    Route::post('/cooperators', [CooperatorController::class, 'store']);
    Route::get('/cooperators/{cooperator}', [CooperatorController::class, 'show']);
    Route::put('/cooperators/{cooperator}', [CooperatorController::class, 'update']);
    Route::delete('/cooperators/{cooperator}', [CooperatorController::class, 'destroy']);
});
