<?php namespace App\Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Artisan;
use Mail;

class TestCase extends BaseTestCase {

    public function setUp()
    {
        parent::setUp();

        $this->prepareForTests();
        $this->seedDatabase();
    }

    /**
     * Creates the application.
     *
     * @return Symfony\Component\HttpKernel\HttpKernelInterface
     */
    public function createApplication()
    {
    	$unitTesting = true;

        $testEnvironment = 'testing';

        return require __DIR__.'/../../bootstrap/start.php';
    }

    /**
     * Migrates the database and set the mailer to 'pretend'.
     * This will cause the tests to run quickly.
     */
    private function prepareForTests()
    {
        Artisan::call('migrate');
        Mail::pretend(true);
    }

    protected function seedDatabase() {}

}
