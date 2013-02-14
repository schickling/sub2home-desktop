<?php

use Illuminate\Database\Migrations\Migration;

class ArticleModelMenuUpgradeModelRelationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('article_model_menu_upgrade_model', function($table) {
			$table->increments('id');
			$table->integer('article_model_id')->unsigned();
			$table->integer('menu_upgrade_model_id')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('article_model_menu_upgrade_model');
	}

}