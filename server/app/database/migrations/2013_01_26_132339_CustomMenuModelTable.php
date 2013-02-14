<?php

use Illuminate\Database\Migrations\Migration;

class CustomMenuModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('custom_menu_models', function($table) {
			$table->increments('id');
			// belongs to a bundle or an upgrade
			$table->integer('menu_bundle_model_id')->unsigned();
			$table->integer('menu_upgrade_model_id')->unsigned();
			$table->integer('store_model_id')->unsigned();
			$table->integer('buyed')->unsigned();
			$table->decimal('price', 5, 2)->default(0);
			$table->boolean('hasOwnPrice')->default(false);
			$table->boolean('isActive')->default(false);
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
		Schema::dropIfExists('custom_menu_models');
	}

}