<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    
    protected $table = "tbl_products";


    protected $fillable = [
        "VID",
        "bodytype",
        "color",
        "price",
        "image",
        "brand",
        "model",
        "transmission",
        "engine",
        "model_year",
        "unique_key",
        "user_fk",
    ];
}
