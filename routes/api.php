<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('Login',[AuthController::class, 'Login']);
Route::post('CreateAccount',[AuthController::class, 'CreateAccount']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
