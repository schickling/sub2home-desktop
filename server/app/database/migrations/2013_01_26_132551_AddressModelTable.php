<?php

use Illuminate\Database\Migrations\Migration;

class AddressModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('address_models', function($table) {
			$table->increments('id');
			$table->string('firstName', 128);
			$table->string('lastName', 128);
			$table->string('street', 128);
			$table->string('streetAdditional', 128);
			$table->string('city', 128);
			$table->string('phone', 128);
			$table->string('email', 128);
			$table->integer('postal');
			$table->integer('store_model_id');
			$table->integer('client_model_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('address_models');
	}

}