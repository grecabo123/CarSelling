<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    //

    public function GetLogs($id){
        $logs = Logs::where('user_fk',$id)->get();

        return response()->json([
            "status"            =>          200,
            "logs"              =>          $logs,
        ]);
    }
}
