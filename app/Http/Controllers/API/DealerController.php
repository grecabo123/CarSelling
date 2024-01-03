<?php

namespace App\Http\Controllers\API;

use App\Models\Logs;
use App\Models\User;
use App\Models\Dealers;
use App\Models\Products;
use App\Models\Supplier;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DealerController extends Controller
{
    //

    public function DealerData(Request $request){
        
    }

    public function ProductDetails ($id) {
        $data = Products::join('tbl_supplier','tbl_supplier.user_fk','=','tbl_products.user_fk')
            ->where('tbl_products.unique_key',$id)
                ->first();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function Manufacture (){
        $data = Supplier::join('users','users.id','=','tbl_supplier.user_fk')
            ->join('tbl_barangay_coordinates','tbl_barangay_coordinates.id','users.brgy_fk')
                ->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function BuyProduct(Request $request){

        $data = Products::where('unique_key',$request->uniq)->first();

        if($data) {
            $data->is_dealer_sold = 1;
            $data->supplier_fk = $request->id;
            $data->dealer_price = $request->amount;
            $data->update();

            
            $dealer_product = new Dealers;
            $dealer_product->user_fk = $request->id;
            $dealer_product->products_fk = $data->id;
            $dealer_product->price_sold = $request->amount;
            $dealer_product->save();

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

    public function Product(){
        $product = Products::join('tbl_supplier','tbl_supplier.user_fk','=','tbl_products.user_fk')
            ->join('users','users.id','=','tbl_products.supplier_fk')
                ->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $product,
        ]);
    }
}
