<?php

/**
* 
*/
class Api_Ingredients_Controller extends Api_Controller
{
	public function get_index()
	{
		$this->checkStore();

		$article_id = URI::segment(5);
		$article = Article::find($article_id);

		$ingredients = $article->ingredients;

		return eloquent_to_json($ingredients);
	}

}