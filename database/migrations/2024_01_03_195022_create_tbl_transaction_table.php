<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_transaction', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('seller_fk');
            $table->foreign('seller_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('buyer_fk');
            $table->foreign('buyer_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('products_fk');
            $table->foreign('products_fk')->references('id')->on('tbl_products')->onDelete('cascade')->onUpdate('cascade');
            $table->double('current_price',10,2);
            $table->double('sold_price',10,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_transaction');
    }
}
