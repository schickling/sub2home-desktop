<?php namespace App\Commands\Test;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Exception;

use App\Models\StoreModel;
use App\Models\ArticleModel;


class TestActivateCommand extends Command {


	protected $name = 'test:activate';

	protected $description = 'Activate all of the given items';


	public function fire()
	{
		$store_model_id = $this->argument('store_model_id');
		$storeModel = StoreModel::find($store_model_id);

		if ($storeModel == null) {
			throw new Exception('No store model found');
		}


		$modelType = $this->argument('modelType');

		switch ($modelType) {
			case 'articles':
				$this->activateCustomArticlesOfStoreForStore($storeModel);
				break;
		}

	}

	private function activateCustomArticlesOfStoreForStore($storeModel)
	{
		$articlesCollection = ArticleModel::all();

		foreach ($articlesCollection as $articleModel) {
			$customArticleModel = $articleModel->returnCustomModel($storeModel->id);
			$customArticleModel->isActive = true;
			$customArticleModel->save();
		}


		$this->line($articlesCollection->count() . ' articles are activated.');
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
			array('modelType', InputArgument::OPTIONAL, 'Number of test orders', 'articles')
			);
	}



}