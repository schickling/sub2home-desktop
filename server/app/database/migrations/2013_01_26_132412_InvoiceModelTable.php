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
			$table->integer('number')->unsigned()->default();
			$table->integer('timeSpan'); // total number of months
			$table->decimal('total', 7, 2)->default(0);
			$table->string('invoiceDocumentName', 128)->default('');
			$table->string('attachmentDocumentName', 128)->default('');
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
		Schema::dropIfExists('invoice_models');
	}

}