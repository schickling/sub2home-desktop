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
			$table->string('title', 128)->default('');
			$table->string('smallImage', 128)->default('');
			$table->string('largeImage', 128)->default('');
			$table->text('info')->default('');
			$table->text('description')->default('');
			$table->integer('category_model_id');
			$table->integer('buyed')->unsigned()->default(0);
			$table->integer('order')->unsigned();
			$table->decimal('price', 5, 2)->default(0);
			$table->decimal('deposit', 5, 2)->default(0);
			$table->boolean('allowsIngredients')->default(false);
			$table->boolean('allowsDeposit')->default(false);
			$table->boolean('allowsMenuUpgrades')->default(false);
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
		Schema::dropIfExists('article_models');
	}

}