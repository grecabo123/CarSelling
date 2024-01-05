<?php

namespace App\Http\Controllers\API;

use App\Models\Dealers;
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

        $details = Products::where('unique_key',$id)->first();

        
        $dealer_price = Dealers::where('products_fk',$details->id)->first();


        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
            "dealer_price"      =>          $dealer_price,
        ]);
    }

    public function BuyProduct(Request $request){

        $data = Products::where('unique_key',$request->uniq)->first();

        $dealer = Dealers::where('products_fk',$data->id)->first();

        if($data) {
            $data->is_customer_sold = 1;
            $data->update();

            $transaction = new Transaction;
            $transaction->seller_fk = $data->user_fk;
            $transaction->buyer_fk = $request->id;
            $transaction->products_fk = $data->id;
            $transaction->current_price = $dealer->dealer_price;
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

    public function Product (){
        $product = Products::join('tbl_supplier','tbl_supplier.user_fk','=','tbl_products.user_fk')
            ->join('users','users.id','=','tbl_products.supplier_fk')
                ->where('tbl_products.is_dealer_sold', 1)
                    ->where('tbl_products.is_customer_sold',0)
                    ->get();   

        return response()->json([
            "status"            =>          200,
            "data"              =>          $product,
        ]);
    }
}
