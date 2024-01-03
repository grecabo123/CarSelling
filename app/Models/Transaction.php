<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = "tbl_transaction";
    protected $fillable = [
        "seller_fk",
        "buyer_fk",
        "products_fk",
        "current_price",
        "sold_price",
    ];
}
