<?php

use Illuminate\Database\Migrations\Migration;

class StoreModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('store_models', function($table) {
			$table->increments('id');
			$table->string('title', 128)->unique();
			$table->string('alias', 128)->unique();
			$table->string('orderEmail', 128);
			// Paypal identification
			$table->string('paypalToken', 128);
			$table->string('paypalTokensecret', 128);
			$table->integer('number');
			$table->integer('client_model_id');
			$table->float('latitude');
			$table->float('longitude');
			$table->decimal('totalTurnover', 12, 2);
			$table->boolean('isActive');
			$table->boolean('isOpen');
			$table->boolean('allowsPaymentCash');
			$table->boolean('allowsPaymentEc');
			$table->boolean('allowsPaymentPaypal');
			$table->text('description');
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
		Schema::dropIfExists('store_models');
	}

}