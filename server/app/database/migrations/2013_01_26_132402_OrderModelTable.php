<?php

use Illuminate\Database\Migrations\Migration;

class OrderModelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_models', function($table) {
			$table->increments('id');
			$table->enum('paymentMethod', array('cash', 'ec', 'paypal'))->default('cash');
			$table->boolean('isDelivered')->default(false);
			$table->boolean('store_model_id')->default(false);
			$table->integer('order_model_id')->unsigned()->default(0); // balance order model
			$table->integer('invoice_model_id')->unsigned();
			$table->decimal('credit', 7, 2)->default(0);
			$table->decimal('total', 7, 2)->default(0);
			$table->decimal('commissionRate', 2, 2)->default(0);
			$table->text('comment')->default('');
			$table->string('ip', 128);
			$table->string('subcardCode', 128);
			$table->timestamp('due_at')->default(date("Y-m-d H:i:s"));
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
		Schema::dropIfExists('order_models');
	}

}