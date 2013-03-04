<?php namespace App\Controllers\Jobs;

use Log;

abstract class BaseJob {

	protected $job;

	protected $data;

	public function fire($job, $data) {
		$this->job = $job;
		$this->data = $data;

		try {
			$this->run();
		} catch (Exception $e) {
			Log::error($e);
		}

		$this->job->delete();

	}

	abstract protected function run();

}