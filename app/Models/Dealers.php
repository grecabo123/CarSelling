<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dealers extends Model
{
    use HasFactory;

    protected $table = "tbl_dealers";


    protected $fillable = [
        "dealer_name",
        "address",
    ];
}
