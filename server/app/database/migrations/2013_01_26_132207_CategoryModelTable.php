<?php

use Illuminate\Database\Migrations\Migration;

class CategoryModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('category_models', function($table) {
			$table->increments('id');
			$table->string('title', 128)->default('');
			$table->string('icon', 128)->default('');
			$table->string('smallImage', 128)->default('');
			$table->integer('order')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('category_models');
	}

}