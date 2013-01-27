<?php

use Illuminate\Database\Migrations\Migration;

class ArticleModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('article_models', function($table) {
			$table->increments('id');
			$table->string('title', 128);
			$table->string('smallImage', 128);
			$table->string('largeImage', 128);
			$table->text('info');
			$table->text('description');
			$table->integer('category_model_id');
			$table->integer('buyed');
			$table->integer('order');
			$table->decimal('price', 5, 2);
			$table->decimal('deposit', 5, 2);
			$table->boolean('allowsIngredients');
			$table->boolean('allowsDeposit');
			$table->boolean('allowsMenuUpgrades');
			$table->boolean('isPublished');
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
		Schema::dropIfExists('article_models');
	}

}