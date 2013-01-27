<?php

use Illuminate\Database\Migrations\Migration;

class BankaccountModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bankaccount_models', function($table) {
			$table->increments('id');
			$table->string('name', 128);
			$table->string('bankName', 128);
			$table->integer('bankCodeNumber');
			$table->integer('accountNumber');
			$table->integer('store_model_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('bankaccount_models');
	}

}