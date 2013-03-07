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
			$table->integer('store_model_id')->unsigned();
			$table->integer('postal')->unsigned()->default(0);
			$table->integer('minimumDuration')->unsigned()->default(0);
			$table->decimal('minimumValue', 5, 2)->default(0);
			$table->string('city', 128)->default('');
			$table->string('district', 128)->default('');
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