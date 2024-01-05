<?php

namespace App\Http\Controllers\API;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TransactionController extends Controller
{
    //

    public function TransactionDataSeller ($id){
        $data = Transaction::join('users as u1','u1.id','=','tbl_transaction.seller_fk')
        ->join('tbl_products','tbl_products.id','=','tbl_transaction.products_fk')
            ->join('users as u2','u2.id','=','tbl_transaction.buyer_fk')
                // ->join('tbl_dealers_product','tbl_dealers_product.products_fk','=','tbl_products.id')
                ->join('tbl_supplier','tbl_supplier.user_fk','=','tbl_transaction.seller_fk')
                ->where('tbl_transaction.seller_fk',$id)
                    ->get();


            return response()->json([
                "status"            =>          200,
                "data"              =>          $data,
            ]);
    }

    public function TransactionData($id){

        $data = Transaction::join('users as u1','u1.id','=','tbl_transaction.seller_fk')
            ->join('tbl_products','tbl_products.id','=','tbl_transaction.products_fk')
                ->join('users as u2','u2.id','=','tbl_transaction.buyer_fk')
                
                    ->join('tbl_supplier','tbl_supplier.user_fk','=','tbl_transaction.seller_fk')
                    ->where('tbl_transaction.buyer_fk',$id)
                        ->get();


        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }
}
