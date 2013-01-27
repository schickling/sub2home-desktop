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
			$table->integer('menu_bundle_model_id');
			$table->integer('menu_upgrade_model_id');
			$table->integer('store_model_id');
			$table->integer('buyed');
			$table->decimal('price', 5, 2);
			$table->boolean('hasOwnPrice');
			$table->boolean('isActive');
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