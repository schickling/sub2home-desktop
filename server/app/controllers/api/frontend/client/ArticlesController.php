<?php namespace App\Controllers\Api\Frontend\Client;

use Input;
use Validator;

use App\Models\ArticleModel;

/**
* 
*/
class ArticlesController extends ApiController
{



	public function update($id)
	{
		// security
		$this->loadStoreModel();
		$this->checkAuthentification();

		if ($this->hasErrorOccured()) {
			return $this->respondWithError();
		}

		// check input
		$input = Input::json();
		$rules = array(
			'customPrice'		=> 'numeric|required|min:0',
			'isActive'			=> 'boolean|required'
			);

		$validator = Validator::make($input, $rules);

		if ($validator->fails()) {
			return $this->respondWithStatus(400, $validator->messages());
		}

		// fetch customArticleModel
		$articleModel = ArticleModel::find($id);
		$customArticleModel = $articleModel->returnCustomModel($this->storeModel->id);

		// check if is last active article
		if (!$input['isActive'] and $this->isLastActiveArticle()) {
			return $this->respondWithStatus(400);
		}

		// update
		$customArticleModel->isActive = $input['isActive'];
		$customArticleModel->price = $input['customPrice'];

		$customArticleModel->save();

		return $this->respondWithStatus(204);
	}

	private function isLastActiveArticle()
	{
		$numberOfActiveCustomArticles = $this->storeModel->customArticlesCollection()->where('isActive', true)->count();

		return $numberOfActiveCustomArticles < 2;
	}

}