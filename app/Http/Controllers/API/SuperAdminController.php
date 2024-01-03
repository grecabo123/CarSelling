<?php

namespace App\Http\Controllers\API;

use App\Models\Logs;
use App\Models\User;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SuperAdminController extends Controller
{
    //

    public function AllData() {
        $data = Supplier::join('users','users.id','=','tbl_supplier.user_fk')
            ->join('tbl_barangay_coordinates','tbl_barangay_coordinates.id','=','users.brgy_fk')
                ->where('role',1)
                ->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    } 

    public function CreateAccount (Request $request){
        $validate = Validator::make($request->all(), [
            "name"          =>      "required",
            "contact"       =>      "required",
            "email"         =>      "required|email|unique:users,email",
        ]);

        if($validate->fails()){
            return response()->json([
                "error"         =>      $validate->messages(),
            ]);
        }
        else{



            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = 1;
            $user->status = 1;
            $user->brgy_fk = $request->brgy;
            $user->contact= $request->contact;
            $user->secret = $request->name;
            $user->password = Hash::make($request->name);
            $user->save();

            $suppler = new Supplier;

            $suppler->supplier_name = $request->name;
            $suppler->user_fk = $user->id;
            $suppler->save();

            $logs = new Logs;

            $logs->description = "Created Manufacture"." ".$request->name;
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
                "success"           =>          "Registered Account Successfully",
            ]);

        }
    }
}
