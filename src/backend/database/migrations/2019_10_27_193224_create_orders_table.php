<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->text('note')->nullable();
            $table->integer('client_id')->nullable();
            $table->integer('machine_id')->nullable();
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('set null');
            $table->foreign('machine_id')->references('id')->on('machines_and_procedures')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
