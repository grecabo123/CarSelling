<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    use HasFactory;

    protected $table = "tbl_logs";


    protected $fillable = [
        "description",
        "user_fk",
    ];
}
