<?php namespace App\Controllers\Jobs;

use Log;
use Exception;

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

		$job->delete();

	}

	abstract protected function run();

}