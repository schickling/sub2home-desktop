<?php

use App\Commands\Invoices\SendInvoicesForLastMonthCommand;
use App\Commands\Invoices\GenerateMissingDocumentsCommand;
use App\Commands\Test\TestOrdersCommand;
use App\Commands\Test\TestActivateCommand;

/*
|--------------------------------------------------------------------------
| Register The Artisan Commands
|--------------------------------------------------------------------------
|
| Each available Artisan command must be registered with the console so
| that it is available to be called. We'll register every command so
| the console gets access to each of the command object instances.
|
*/

Artisan::add(new SendInvoicesForLastMonthCommand);
Artisan::add(new GenerateMissingDocumentsCommand);
Artisan::add(new TestOrdersCommand);
Artisan::add(new TestActivateCommand);