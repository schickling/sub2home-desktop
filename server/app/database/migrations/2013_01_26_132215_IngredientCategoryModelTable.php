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
			$table->string('title', 128)->default('');
			$table->string('smallImage', 128)->default('');
			$table->string('icon', 128)->default('');
			$table->integer('order')->unsigned();
			$table->boolean('isSingle')->default(false);
			$table->boolean('isMandatory')->default(false);
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