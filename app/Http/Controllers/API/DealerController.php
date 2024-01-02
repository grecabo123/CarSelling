<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;

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
        $data = Supplier::all();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function Product(){
        $product = Products::join('tbl_supplier','tbl_supplier.user_fk','=','tbl_products.user_fk')
            ->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $product,
        ]);
    }
}
