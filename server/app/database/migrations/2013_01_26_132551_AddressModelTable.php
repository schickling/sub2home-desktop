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
			$table->string('firstName', 128)->default('');
			$table->string('lastName', 128)->default('');
			$table->string('street', 128)->default('');
			$table->string('streetAdditional', 128)->default('');
			$table->string('city', 128)->default('');
			$table->string('phone', 128)->default('');
			$table->string('email', 128)->default('');
			$table->integer('postal')->unsigned()->default(0);
			$table->string('ownerModel_type');
			$table->integer('ownerModel_id')->unsigned();
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