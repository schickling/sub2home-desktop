<?php

use Illuminate\Database\Migrations\Migration;

class IngredientModelOrderedArticleModelRelationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ingredient_model_ordered_article_model', function($table) {
			$table->increments('id');
			$table->integer('ingredient_model_id')->unsigned();
			$table->integer('ordered_article_model_id')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('ingredient_model_ordered_article_model');
	}

}