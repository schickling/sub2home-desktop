<?php

use Illuminate\Database\Migrations\Migration;

class InvoiceModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invoice_models', function($table) {
			$table->increments('id');
			$table->integer('store_model_id')->unsigned();
			$table->decimal('total', 7, 2)->default(0);
			$table->string('documentName', 128)->default('');
			$table->timestamp('timeSpan');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('invoice_models');
	}

}