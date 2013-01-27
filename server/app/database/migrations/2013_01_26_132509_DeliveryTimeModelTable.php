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
			$table->integer('store_model_id');
			$table->integer('dayOfWeek');
			$table->integer('startMinutes');
			$table->integer('endMinutes');
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