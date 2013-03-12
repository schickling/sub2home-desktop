<?php namespace App\Database\Migrations;

use Illuminate\Database\Migrations\Migration;

abstract class FolderMigration extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		$dir = $this->getDir();

		if (!is_dir($dir)) {
			mkdir($dir);
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		$dir = $this->getDir();
	
		if (is_dir($dir)) {
			$this->rrmdir($dir);
		}
	}

	/**
	 * Recursive remove directory
	 * 
	 * @param  string $dir
	 * @return void
	 */
	private function rrmdir($dir)
	{
		if (is_dir($dir)) {
			$objects = scandir($dir);
			foreach ($objects as $object) {
				if ($object != '.' and $object != '..') {
					if (filetype($dir . '/' . $object) == 'dir') {
						$this->rrmdir($dir . '/' . $object);
					} else {
						unlink($dir . '/' . $object);
					}
				}
			}
			reset($objects);
			rmdir($dir);
		}
	}

	abstract protected function getDir();

}