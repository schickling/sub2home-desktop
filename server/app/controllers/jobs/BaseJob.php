<?php namespace App\Controllers\Jobs;

use Log;
use Exception;
use App\Exceptions\JobException;

abstract class BaseJob {

	protected $job;

	protected $data;

	public function fire($job, $data) {
		$this->job = $job;
		$this->data = $data;

		try {
			$this->run();
		} catch (Exception $e) { // catch all
			Log::error($e);
		}

		$job->delete();

	}

	abstract protected function run();

	final protected function throwException()
	{
		throw new JobException($message);
	}

}