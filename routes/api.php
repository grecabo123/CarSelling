<?php

use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\SuperAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\DealerController;
use App\Http\Controllers\API\BarangayController;
use App\Http\Controllers\API\TransactionController;

Route::post('Login',[AuthController::class, 'Login']);
Route::post('CreateAccount',[AuthController::class, 'CreateAccount']);


// Barangay
Route::get('BarangayData', [BarangayController::class, 'ListBarangay']);


// Logs
Route::get('GetLogs/{id}',[LogsController::class, 'GetLogs']);

// Product
Route::get('Product',[DealerController::class,'Product']);
Route::get('Manufacture',[DealerController::class,'Manufacture']);

// Dealer
Route::get('DealerData', [DealerController::class, 'DealerData']);

// Transaction
Route::get('Transaction/{id}',[TransactionController::class, 'TransactionData']);
Route::get('TransactionSeller/{id}',[TransactionController::class, 'TransactionDataSeller']);

// Dealer
Route::middleware(['auth:sanctum', 'isDealer'])->group(function () {
    Route::get('/isDealer',function () {
        return response()->json([
            'role'          =>          auth()->user()->role,
            "status"        =>      200,

        ],200);
    });
    
    Route::get('ProductDetailsDealer/{id}',[DealerController::class,'ProductDetails']);
    Route::put('BuyProduct',[DealerController::class,'BuyProduct']);
});



Route::middleware(['auth:sanctum', 'isCustomer'])->group(function () {
    Route::get('/customer',function () {
        return response()->json([
            'role'          =>          auth()->user()->role,
            "status"        =>      200,
        ],200);
    });

    Route::get('ProductDetails/{id}',[CustomerController::class,'ProductDetails']);
    Route::put('BuyProduct',[CustomerController::class,'BuyProduct']);
    
});

Route::middleware(['auth:sanctum', 'isSuperAdmin'])->group(function () {
    Route::get('/superadmin',function () {
        return response()->json([
            'role'          =>          auth()->user()->role,
            "status"        =>      200,
        ],200);
    }); 
    Route::get('AllData',[SuperAdminController::class, 'AllData']);
    Route::post('CreateAccount',[SuperAdminController::class, 'CreateAccount']);
    
});

Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    Route::get('/checking',function () {
        return response()->json([
            'role'          =>          auth()->user()->role,
            "status"        =>      200,
        ],200);
    });

    Route::put('UpdateProduct',[AdminController::class, 'UpdateProduct']);
    Route::get('DealerAccount',[AdminController::class, 'DealerAccount']);
    Route::post('AddDealer',[AdminController::class, 'AddDealer']);
    Route::delete('RemoveDealer/{id}',[AdminController::class, 'RemoveDealer']);
    Route::put('DealerUpdate',[AdminController::class, 'DealerUpdate']);
    Route::get('AllProduct',[AdminController::class, 'AllProduct']);
    Route::post('AddProduct',[AdminController::class, 'AddProduct']);

});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout',[AuthController::class, 'Logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
