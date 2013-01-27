<?php

use Illuminate\Database\Migrations\Migration;

class IngredientCategoryModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ingredient_category_models', function($table) {
			$table->increments('id');
			$table->string('title', 128);
			$table->string('smallImage', 128);
			$table->integer('order');
			$table->boolean('isSingle');
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
		Schema::dropIfExists('ingredient_category_models');
	}

}