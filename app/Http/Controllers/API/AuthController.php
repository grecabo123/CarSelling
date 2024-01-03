<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    
    public function Login (Request $request){
        $validate = Validator::make($request->all(), [
            "email"         =>      "required",
            "password"      =>      "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"     =>      $validate->messages(),
            ]);
        }
        else{
            $user = User::where('email',$request->email)->first();
            if($user || Hash::check($request->password, $user->password)){   
                if($user->status == 1){
                    if($user->role == 1){
                        $token = $user->createToken($user->email.'_Admin',['server:admin'])->plainTextToken;
                    }
                    // Dealer
                    else if($user->role == 2) {
                        $token = $user->createToken($user->email.'_Dealer',['server:dealer'])->plainTextToken;

                    }
                    else if($user->role == 4) {
                        $token = $user->createToken($user->email.'_SuperAdmin',['server:super'])->plainTextToken;

                    }
                    else{
                        // user as a customer
                        $token = $user->createToken($user->email.'_customer',['server:customer'])->plainTextToken;
                    }
                    return response()->json([
                        "status"            =>      200,
                        "role"              =>      $user->role,
                        "id"                =>      $user->id,
                        "name"              =>      $user->name,
                        "token"             =>      $token,
                        "message"           =>      "Logged In Successfuly",
                    ]);
                }
                else{
                    // check if the account is not verified
                    return response()->json([
                        "status"        =>          501,
                        "message"       =>          "Your Account is not verified",
                    ]);
                }
            }
            else{
                // Wrong input credintials
                return response()->json([
                    "status"        =>          504,
                    "message"       =>          "Wrong Credintials",
                ]);
                
            }
        }
    }

    public function CreateAccount (Request $request){
        $validate = Validator::make($request->all(), [
            "fname"         =>      "required",
            "lname"         =>      "required",
            "email"         =>      "required|email|unique:users,email",
            "password"      =>      "required",
        ]);

        if($validate->fails()){
            return response()->json([
                "error"         =>      $validate->messages(),
            ]);
        }
        else{
            $user = new User;

            $user->name = $request->fname." ".$request->lname;
            $user->email = $request->email;
            $user->role = 3;
            $user->status = 1;
            $user->secret = $request->password;
            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json([
                "status"            =>          200,
                "success"           =>          "Registered Account Successfully",
            ]);

        }
    }
    
    public function Logout(){
        auth()->user()->tokens()->delete();

        return response()->json([
            "status"        =>      200,
            'message'       =>      "Logout Successfully",
        ]);
    }
}
