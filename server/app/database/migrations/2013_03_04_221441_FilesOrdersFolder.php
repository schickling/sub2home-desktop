<?php

use App\Database\Migrations\FolderMigration;

class FilesOrdersFolder extends FolderMigration {

	protected function getDir()
	{
		return base_path() . '/public/files/orders';
	}

}