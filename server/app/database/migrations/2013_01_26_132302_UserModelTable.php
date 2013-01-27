<?php

use Illuminate\Database\Migrations\Migration;

class UserModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_models', function($table) {
			$table->increments('id');
			$table->string('role', 128);
			$table->string('password', 255);
			$table->string('email')->unique();
			$table->integer('number');
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
		Schema::dropIfExists('user_models');
	}

}