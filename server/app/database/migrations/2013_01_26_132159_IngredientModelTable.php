<?php

use Illuminate\Database\Migrations\Migration;

class IngredientModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ingredient_models', function($table) {
			$table->increments('id');
			$table->string('title', 128)->default('');
			$table->string('description', 128)->default('');
			$table->string('shortTitle', 128)->default('');
			$table->string('shortcut', 5)->default('');
			$table->string('smallImage', 128)->default('');
			$table->string('largeImage', 128)->default('');
			$table->integer('ingredient_category_model_id')->unsigned();
			$table->integer('buyed')->unsigned()->default(0);
			$table->integer('order')->unsigned();
			$table->decimal('price', 5, 2);
			$table->boolean('isPublished')->default(false);
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
		Schema::dropIfExists('ingredient_models');
	}

}