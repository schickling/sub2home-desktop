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
			$table->string('image', 128);
			$table->string('title', 128);
			$table->integer('buyed');
			$table->boolean('isPublished');
			$table->text('description');
			$table->decimal('price', 5, 2); // upgrade price
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