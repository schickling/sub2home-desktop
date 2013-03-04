<?php

use App\Database\Migrations\FolderMigration;

class FilesInvoicesFolder extends FolderMigration {

	protected function getDir()
	{
		return base_path() . '/public/files/invoices';
	}

}