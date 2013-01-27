<?php

use Illuminate\Database\Migrations\Migration;

class ArticleModelMenuComponentOptionModelRelationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('article_model_menu_component_option_model', function($table) {
			$table->increments('id');
			$table->integer('article_model_id');
			$table->integer('menu_component_option_model_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('article_model_menu_component_option_model');
	}

}