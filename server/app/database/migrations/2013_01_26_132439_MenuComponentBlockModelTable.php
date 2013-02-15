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
			$table->integer('menu_bundle_model_id')->unsigned();
			$table->integer('menu_upgrade_model_id')->unsigned();
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