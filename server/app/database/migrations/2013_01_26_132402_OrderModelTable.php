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
			$table->enum('paymentMethod', array('cash', 'ec', 'paypal'));
			$table->boolean('isDelivered');
			$table->integer('store_model_id');
			$table->decimal('credit', 7, 2);
			$table->decimal('total', 7, 2);
			$table->text('comment');
			$table->timestamp('due_at');
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