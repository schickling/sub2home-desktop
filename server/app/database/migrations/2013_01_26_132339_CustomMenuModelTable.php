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
			$table->string('menuModel_type');
			$table->integer('menuModel_id')->unsigned();
			$table->integer('store_model_id')->unsigned();
			$table->integer('buyed')->unsigned()->default(0);
			$table->decimal('price', 5, 2)->default(0);
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