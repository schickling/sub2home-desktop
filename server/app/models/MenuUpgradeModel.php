<?php

/**
 * Menu upgrade class
 */
class MenuUpgradeModel extends MenuModel
{
	
	public $hidden = array('buyed', 'created_at', 'updated_at', 'isPublished');


	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Delete relationship with related articlesCollection
		foreach ($this->articlesCollection as $articleModel) {
			$articleModel->pivot->delete();
		}

		return parent::delete();
	}

	/**
	 * Returns the articlesCollection which allow this upgrade
	 * 
	 * @return object
	 */
	public function articlesCollection()
	{
		return $this->belongsToMany('ArticleModel');
	}

}
