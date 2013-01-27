<?php

use Illuminate\Database\Migrations\Migration;

class DeliveryAreaModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('delivery_area_models', function($table) {
			$table->increments('id');
			$table->string('description', 128);
			$table->integer('store_model_id');
			$table->integer('postal');
			$table->integer('minimumDuration');
			$table->decimal('minimumValue', 5, 2);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('delivery_area_models');
	}

}