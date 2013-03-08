<?php

use Illuminate\Database\Migrations\Migration;

class FlushCache extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Cache::flush();
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Cache::flush();
	}

}