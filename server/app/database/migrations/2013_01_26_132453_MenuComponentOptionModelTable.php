<?php

use Illuminate\Database\Migrations\Migration;

class MenuComponentOptionModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('menu_component_option_models', function($table) {
			$table->increments('id');
			$table->integer('menu_component_block_model_id');
			$table->integer('category_model_id');
			$table->string('title', 128);
			$table->string('icon', 128);
			$table->string('smallImage', 128);
			$table->string('largeImage', 128);
			$table->string('placeholder', 128);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('menu_component_option_models');
	}

}