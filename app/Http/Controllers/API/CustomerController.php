<?php

namespace App\Http\Controllers\API;

use App\Models\Logs;
use App\Models\Products;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{
    //

    public function ProductDetails ($id) {
        $data = Products::join('tbl_supplier','tbl_supplier.user_fk','=','tbl_products.user_fk')
            ->where('tbl_products.unique_key',$id)
                ->first();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function BuyProduct(Request $request){

        $data = Products::where('unique_key',$request->uniq)->first();

        if($data) {
            $data->is_customer_sold = 1;
            $data->update();
            
            $transaction = new Transaction;
            $transaction->seller_fk = $data->user_fk;
            $transaction->buyer_fk = $request->id;
            $transaction->products_fk = $data->id;
            $transaction->current_price = $data->price;
            $transaction->sold_price = $request->amount;
            $transaction->save();

            $logs = new Logs;

            $logs->description = "Bought a Product"." ".$data->VID;
            $logs->user_fk = $request->id;

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
