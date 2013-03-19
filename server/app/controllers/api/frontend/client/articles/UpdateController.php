<?php namespace App\Controllers\Api\Frontend\Client\Articles;

use App\Controllers\Api\Frontend\Client\StoreRelatedApiController;
use Input;
use Validator;
use Request;
use App\Models\ArticleModel;

/**
* 
*/
class UpdateController extends StoreRelatedApiController
{

	/**
	 * @PUT('api/frontend/stores/{alias}/articles/{id}')
	 */
	public function route()
	{

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
		$id = Request::segment(6);

		$articleModel = ArticleModel::find($id);
		$this->checkModelFound($articleModel);

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