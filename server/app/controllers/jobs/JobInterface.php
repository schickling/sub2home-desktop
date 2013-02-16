<?php namespace App\Controllers\Jobs;

interface JobInterface {

	public function fire($job, $data);

}