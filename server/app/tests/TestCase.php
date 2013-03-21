<?php namespace App\Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Artisan;
use Mail;

class TestCase extends BaseTestCase {

    protected $loadMigrations = false;
    protected $loadSeeds = false;

    public function setUp()
    {
        parent::setUp();

        $this->prepareForTests();
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
        $this->prepareDatabase();

        Mail::pretend(true);
    }

    private function prepareDatabase()
    {
        if ($this->loadMigrations) {

            Artisan::call('migrate');

            $this->seedDatabase();

            if ($this->loadSeeds) {
                Artisan::call('db:seed');
            }

        }
    }

    protected function seedDatabase() {}

    /*
     * content helper methods 
     */

    protected function createTestStore()
    {
        // article models needed so load seeds
        $this->loadSeeds = true;

        // use store model from seeds, so nothing more to do
    }

}
