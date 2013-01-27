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
			$table->string('title', 128);
			$table->string('icon', 128);
			$table->string('smallImage', 128);
			$table->string('largeImage', 128);
			$table->string('placeholderOutline', 128);
			$table->string('placeholderBackground', 128);
			$table->integer('order');
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