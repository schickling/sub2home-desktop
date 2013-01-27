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
			$table->string('title', 128);
			$table->string('largeImage', 128);
			$table->string('icon', 128);
			$table->integer('ingredient_category_model_id');
			$table->integer('order');
			$table->decimal('price', 5, 2);
			$table->boolean('isMandatory');
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