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
			$table->integer('store_model_id')->unsigned();
			$table->decimal('credit', 7, 2)->default(0);
			$table->decimal('total', 7, 2)->default(0);
			$table->decimal('commissionRate', 2, 2)->default(0);
			$table->text('comment')->default('');
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