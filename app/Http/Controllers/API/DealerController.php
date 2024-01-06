<?php

namespace App\Http\Controllers\API;

use App\Models\Logs;
use App\Models\ReserveData;
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

    public function SellProducts(Request $request){
        $product = Products::where('unique_key',$request->uniq)->first();

        $dealer = Dealers::where('products_fk',$product->id)->first();

        if($dealer){
            $dealer->dealer_price = $request->amount;

            $dealer->update();

            return response()->json([
                "status"                =>              200,

            ]);
        }
    }

    public function MyProduct () {
        $product = Products::join('tbl_supplier','tbl_supplier.user_fk','=','tbl_products.user_fk')
            ->join('users','users.id','=','tbl_products.supplier_fk')
                ->where('tbl_products.is_dealer_sold', 1)
                    ->get();

        

        return response()->json([
            "status"            =>          200,
            "data"              =>          $product,
        ]);
    }

    public function ProductDetails ($id) {
        $data = Products::join('tbl_supplier','tbl_supplier.user_fk','=','tbl_products.user_fk')
            ->where('tbl_products.unique_key',$id)
                ->first();
        
        $details = Products::where('unique_key',$id)->first();
    
        $dealer = Dealers::where('products_fk',$details->id)->first();



        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
            "details"           =>          $dealer,
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

    public function BuyProductDealer(Request $request){

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
            $dealer_product->dealer_price = $request->amount;
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
                ->where('tbl_products.is_dealer_sold',0)
                ->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $product,
        ]);
    }

    public function ReportData($id) {

        $data = ReserveData::all();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }
}
