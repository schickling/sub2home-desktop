<?php

use Illuminate\Database\Migrations\Migration;

class CreditModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('credit_models', function($table) {
			$table->increments('id');
			$table->boolean('isAccepted')->default(false);
			$table->integer('order_model_id')->unsigned()->default(0);
			$table->decimal('total', 7, 2)->default(0);
			$table->text('description')->default('');
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
		Schema::dropIfExists('credit_models');
	}

}