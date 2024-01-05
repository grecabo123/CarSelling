<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReserveData extends Model
{
    use HasFactory;

    protected $table = "tbl_reserve";

    protected $fillable = [
        "user_fk",
        "product_id",
        "description",
        "annual_income",
        "reserve_date",
        "name",
    ];
}
