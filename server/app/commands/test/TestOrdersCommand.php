<?php namespace App\Commands\Test;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use DateTime;

use App\Models\TestOrderModel;


class TestOrdersCommand extends Command {


	protected $name = 'test:orders';

	protected $description = 'Generate test orders';


	public function fire()
	{
		$store_model_id = $this->argument('store_model_id');
		$numberOfTestOrders = $this->argument('numberOfTestOrders');
        $isBalanced = $this->option('isBalanced');

        $day = (int) $this->option('day');
        $month = (int) $this->option('month');
        $year = (int) $this->option('year');

        $dateTime = new DateTime();
        $dateTime->setDate($year, $month, $day);

		for ($i = 0; $i < $numberOfTestOrders; $i++) { 
			TestOrderModel::generateTestOrderForStore($store_model_id, $isBalanced, $dateTime);
		}

		if ($isBalanced) {
			$numberOfTestOrders *= 2;
		}

		$this->line($numberOfTestOrders . ' test orders were generated.');
	}

	/**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return array(
            array('store_model_id', InputArgument::REQUIRED, 'Id of the store model'),
            array('numberOfTestOrders', InputArgument::OPTIONAL, 'Number of test orders', 1)
        );
    }
    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return array(
            array('isBalanced', 'b', InputOption::VALUE_NONE, 'Is test order balanced?'),
            array('day', 'd', InputOption::VALUE_REQUIRED, 'Day of the test order', date('j')),
            array('month', 'm', InputOption::VALUE_REQUIRED, 'Month of the test order', date('n')),
            array('year', 'y', InputOption::VALUE_REQUIRED, 'Month of the test order', date('Y'))
        );
    }


}