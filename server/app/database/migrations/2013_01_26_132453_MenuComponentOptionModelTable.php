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
			$table->integer('menu_component_block_model_id')->unsigned();
			$table->integer('category_model_id')->unsigned();
			$table->string('title', 128)->default('');
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