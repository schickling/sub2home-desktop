<?php

use Illuminate\Database\Migrations\Migration;

class ClientModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('client_models', function($table) {
			$table->increments('id');
			$table->string('password', 255);
			$table->string('email')->unique();
			$table->integer('number')->unique();
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
		Schema::dropIfExists('client_models');
	}

}