<?php

use Illuminate\Database\Migrations\Migration;

class OrderModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_models', function($table) {
			$table->increments('id');
			$table->string('payment', 128);
			$table->boolean('isDelivered');
			$table->integer('store_model_id');
			$table->integer('address_model_id');
			$table->integer('client_model_id');
			$table->integer('credit');
			$table->decimal('total', 7, 2);
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
		Schema::dropIfExists('order_models');
	}

}