<?php

use Illuminate\Database\Migrations\Migration;

class OrderedArticleModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ordered_article_models', function($table) {
			$table->increments('id');
			$table->integer('article_model_id')->unsigned();
			$table->integer('ordered_item_model_id')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('ordered_article_models');
	}

}