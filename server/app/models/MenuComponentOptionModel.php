<?php

/**
 * Menu component option class
 */
class MenuComponentOptionModel extends BaseModel
{
	public $timestamps = false;


	protected function afterFirstSave()
	{
		// copy all articles from category on initialize
		foreach ($this->availableArticlesCollection as $articleModel) {
			$this->articlesCollection()->attach($articleModel->id);
		}
	}

	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Delete intermediate rows
		$this->articlesCollection()->delete();

		return parent::delete();
	}

	/**
	 * Returns the menu component block
	 * 
	 * @return object
	 */
	public function menuComponentBlockModel()
	{
		return $this->belongsTo('MenuComponentBlockModel');
	}

	/**
	 * Returns the category
	 * 
	 * @return object
	 */
	public function categoryModel()
	{
		return $this->belongsTo('CategoryModel');
	}

	/**
	 * Returns the articles
	 * 
	 * @return object
	 */
	public function articlesCollection()
	{
		return $this->hasMany('ArticleModel');
	}

	/**
	 * Returns the all available articles
	 * 
	 * @return object
	 */
	public function getAvailableArticlesCollection()
	{
		return $this->categoryModel->articlesCollection;
	}

}