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
			$table->string('orderEmail', 128)->default('');
			$table->integer('number')->unsigned()->unique();
			$table->integer('client_model_id')->unsigned();
			$table->decimal('latitude', 8, 6)->default(0);
			$table->decimal('longitude', 8, 6)->default(0);
			$table->decimal('totalTurnover', 12, 2)->default(0);
			$table->decimal('commissionRate', 2, 2)->default(0);
			$table->boolean('isActive')->default(false);
			$table->boolean('isOpen')->default(false);
			$table->text('description')->default('');
			$table->timestamps();
			// payment methods
			$table->boolean('allowsPaymentCash')->default(false);
			$table->boolean('allowsPaymentEc')->default(false);
			$table->boolean('allowsPaymentPaypal')->default(false);
			// Paypal identification
			$table->string('paypalToken', 128)->nullable();
			$table->string('paypalTokenSecret', 128)->nullable();
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