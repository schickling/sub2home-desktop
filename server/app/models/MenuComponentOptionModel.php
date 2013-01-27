<?php

/**
 * Menu component option class
 */
class MenuComponentOptionModel extends BaseModel
{
	public $timestamps = false;

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
	{
		$exists = $this->exists;
		$ret = parent::save();

		// Inital save new option
		if (!$exists) {

			// copy all articles from category on initialize
			foreach ($this->availableArticlesCollection as $articleModel) {
				$this->articlesCollection()->attach($articleModel->id);
			}
			
		}

		return $ret;
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

	/**
	 * Returns the name of the category as own title
	 * 
	 * @return string
	 */
	public function getTitle()
	{
		return $this->categoryModel->title;
	}

}