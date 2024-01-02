<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\DealerController;
use App\Http\Controllers\API\BarangayController;

Route::post('Login',[AuthController::class, 'Login']);
Route::post('CreateAccount',[AuthController::class, 'CreateAccount']);


// Barangay
Route::get('BarangayData', [BarangayController::class, 'ListBarangay']);


// Logs
Route::get('GetLogs/{id}',[LogsController::class, 'GetLogs']);


// Dealer
Route::get('DealerData', [DealerController::class, 'DealerData']);

// Dealer
Route::middleware(['auth:sanctum', 'isDealer'])->group(function () {
    Route::get('/isDealer',function () {
        return response()->json([
            'role'          =>          auth()->user()->role,
            "status"        =>      200,

        ],200);
    });

    Route::get('Manufacture',[DealerController::class,'Manufacture']);
    Route::get('Product',[DealerController::class,'Product']);
    Route::get('ProductDetails/{id}',[DealerController::class,'ProductDetails']);
});

Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    Route::get('/checking',function () {
        return response()->json([
            'role'          =>          auth()->user()->role,
            "status"        =>      200,
        ],200);
    });

    Route::get('DealerAccount',[AdminController::class, 'DealerAccount']);
    Route::post('AddDealer',[AdminController::class, 'AddDealer']);
    Route::delete('RemoveDealer/{id}',[AdminController::class, 'RemoveDealer']);
    Route::put('DealerUpdate',[AdminController::class, 'DealerUpdate']);
    Route::get('AllProduct',[AdminController::class, 'AllProduct']);
    Route::post('AddProduct',[AdminController::class, 'AddProduct']);

    

    
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
