<?php

use Illuminate\Database\Migrations\Migration;

class MenuComponentBlockModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('menu_component_block_models', function($table) {
			$table->increments('id');
			$table->integer('menuModel_id')->unsigned();
			$table->string('menuModel_type', 128)->unsigned();
			$table->string('icon', 128)->default('');
			$table->string('smallImage', 128)->default('');
			$table->string('largeImage', 128)->default('');
			$table->string('placeholder', 128)->default('');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('menu_component_block_models');
	}

}