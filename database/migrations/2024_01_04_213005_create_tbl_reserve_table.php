<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblReserveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_reserve', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk');
            $table->foreign('user_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name');
            $table->string('reserve_date');
            $table->double('annual_income');
            $table->string('description');
            $table->string('product_id');
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
        Schema::dropIfExists('tbl_reserve');
    }
}
