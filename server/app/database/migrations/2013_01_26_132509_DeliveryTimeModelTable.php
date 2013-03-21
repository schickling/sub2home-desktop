<?php

use Illuminate\Database\Migrations\Migration;

class DeliveryTimeModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('delivery_time_models', function($table) {
			$table->increments('id');
			$table->integer('store_model_id')->unsigned();
			$table->integer('dayOfWeek')->unsigned()->default(0); // A Number, from 0 to 6, Sunday is 0, Monday is 1, and so on.
			$table->integer('startMinutes')->unsigned()->default(0);
			$table->integer('endMinutes')->unsigned()->default(0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('delivery_time_models');
	}

}