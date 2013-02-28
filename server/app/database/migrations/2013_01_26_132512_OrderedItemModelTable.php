<?php

use Illuminate\Database\Migrations\Migration;

class OrderedItemModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ordered_item_models', function($table) {
			$table->increments('id');
			$table->integer('order_model_id')->unsigned();
			$table->integer('menu_bundle_model_id')->unsigned();
			$table->integer('menu_upgrade_model_id')->unsigned();
			$table->integer('amount')->unsigned()->default(1);
			$table->decimal('total', 7, 2)->default(0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('ordered_item_models');
	}

}