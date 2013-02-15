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
			$table->string('name', 128)->default('');
			$table->string('bankName', 128)->default('');
			$table->integer('bankCodeNumber')->unsigned()->default(0);
			$table->integer('accountNumber')->unsigned()->default(0);
			$table->integer('client_model_id')->unsigned();
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