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
			$table->integer('article_model_id');
			$table->integer('ordered_item_model_id');
			$table->integer('amount');
			$table->decimal('total', 5, 2);
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
		Schema::dropIfExists('ordered_article_models');
	}

}