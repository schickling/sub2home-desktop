<?php

use Illuminate\Database\Migrations\Migration;

class CustomArticleModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('custom_article_models', function($table) {
			$table->increments('id');
			$table->integer('article_model_id')->unsigned();
			$table->integer('store_model_id')->unsigned();
			$table->integer('buyed')->unsigned();
			$table->decimal('price', 5, 2)->default(0);
			$table->boolean('isActive')->default(false);
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
		Schema::dropIfExists('custom_article_models');
	}

}