<?php

namespace App\Http\Controllers\API;

use App\Models\Logs;
use App\Models\User;
use App\Models\Products;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    //

    public function DealerAccount () {

        $data = User::join('tbl_barangay_coordinates','tbl_barangay_coordinates.id','=','users.brgy_fk')
        ->where('role',2)
            ->selectRaw('users.id,users.email,users.contact,tbl_barangay_coordinates.brgy_name,users.name')
                ->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function AddDealer(Request $request){

        $validate = Validator::make($request->all(), [
            "dealer"            =>          "required",
            "brgy"              =>          "required",
            "contact"           =>          "required",
            "email"             =>          "required|email|unique:users,email",
        ]);

        if($validate->fails()){

        }
        else{

            $user = new User;

            $user->name = $request->dealer;
            $user->role = 2;
            $user->status = 1;
            $user->brgy_fk = $request->brgy;
            $user->email = $request->email;
            $user->contact = $request->contact;
            $user->password = Hash::make($request->dealer);
            $user->secret = $request->dealer;
            $user->save();


            return response()->json([
                "status"            =>          200,
            ]);
        }
        
    }
    public function RemoveDealer($id){
        $user = User::find($id);
        if($user){
            $user->delete();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function DealerUpdate(Request $request){

        $user = User::find($request->id);

        if($user){
            $user->name = $request->dealer;
            $user->email = $request->email;
            $user->contact = $request->contact;

            $user->update();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
    public function AllProduct () {

        $product = Products::all();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $product,
        ]);
    }

    public function AddProduct (Request $request) {

        $validator = Validator::make($request->all(), [
            "files"                  =>          "required|mimes:png,jpg",
            "vid"                   =>          "required",
            "body"                  =>          "required",
            "color"                 =>          "required",
            "brand"                 =>          "required",
            "model"                 =>          "required",
            "transmission"          =>          "required",
            "engine"                =>          "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "error"             =>          $validator->messages(),
            ]);
        }
        else{

            $products = new Products;

            $products->VID = $request->vid;
            $products->bodytype = $request->body;
            $products->color = $request->color;
            $products->price = $request->price;
            $products->brand = $request->brand;
            $products->model = $request->model;
            $products->unique_key = md5(time());
            $products->transmission = $request->transmission;
            $products->engine = $request->engine;
            $products->model_year = $request->year;
            $products->user_fk = $request->auth_id;

            if($request->hasFile('files')){
                $file = $request->file('files');
                $extension = $file->getClientOriginalExtension();
                $filename = md5(time()).".".$extension;
                $file->move('Uploads/Files/',$filename);
                $products->image =  "Uploads/Files/".$filename;                
            }
            $products->save();

            $logs = new Logs;
            $logs->description = "Create Product to"." ".$request->vid;
            $logs->user_fk = $request->auth_id;
            $logs->save();


            return response()->json([
                "status"            =>          200,
            ]);

        }
    }

    public function UpdateProduct(Request $request){

        $product = Products::where('unique_key',$request->uniq)->first();

        if($product){
            $product->VID = $request->vid;
            $product->bodytype = $request->body;
            $product->color = $request->color;
            $product->price = $request->price;
            $product->brand = $request->brand;
            $product->model = $request->model;
            $product->transmission = $request->transmission;
            $product->engine = $request->engine;
            $product->model_year = $request->year;

            
            if($request->hasFile('files')){
                $file = $request->file('files');
                $extension = $file->getClientOriginalExtension();
                $filename = md5(time()).".".$extension;
                $file->move('Uploads/Files/',$filename);
                $product->image =  "Uploads/Files/".$filename;                
            }
            $product->update();
            
            return response()->json([
                "status"                =>          200,
            ]);
        }
    }
}
