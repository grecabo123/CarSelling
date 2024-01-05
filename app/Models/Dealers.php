<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dealers extends Model
{
    use HasFactory;

    protected $table = "tbl_dealers_product";


    protected $fillable = [
        "user_fk",
        "products_fk",
        "price_sold",
        "dealer_price"
    ];
}
