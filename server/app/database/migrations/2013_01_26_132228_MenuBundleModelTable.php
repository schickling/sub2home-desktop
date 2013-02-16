<?php

use Illuminate\Database\Migrations\Migration;

class MenuBundleModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('menu_bundle_models', function($table) {
			$table->increments('id');
			$table->string('title', 128)->default('');
			$table->string('smallImage', 128)->default('');
			$table->string('largeImage', 128)->default('');
			$table->integer('category_model_id')->unsigned();
			$table->integer('order')->unsigned();
			$table->integer('buyed')->unsigned();
			$table->boolean('isPublished')->default(false);
			$table->text('description')->default('');
			$table->decimal('price', 5, 2)->default(0); // total price
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
		Schema::dropIfExists('menu_bundle_models');
	}

}