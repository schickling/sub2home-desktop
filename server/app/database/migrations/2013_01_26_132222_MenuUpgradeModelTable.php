<?php

use Illuminate\Database\Migrations\Migration;

class MenuUpgradeModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('menu_upgrade_models', function($table) {
			$table->increments('id');
			$table->string('image', 128)->default('');
			$table->string('title', 128)->default('');
			$table->integer('buyed')->unsigned();
			$table->boolean('isPublished')->default(false);
			$table->text('description')->default('');
			$table->decimal('price', 5, 2)->default(0); // upgrade price
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
		Schema::dropIfExists('menu_upgrade_models');
	}

}