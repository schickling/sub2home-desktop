<?php namespace App\Models;

/**
 * Menu bundle class
 */
class MenuBundleModel extends MenuModel
{

	protected $hidden = array('category_model_id', 'buyed', 'created_at', 'updated_at', 'isPublished', 'order');

	protected $fillable = array('category_model_id', 'title', 'description', 'largeImage', 'smallImage', 'price', 'isPublished');

	protected $table = 'menu_bundle_models';

	protected function beforeFirstSave()
	{
		if ( ! static::$unguarded) {

			// Calculate new order concerning a category
			$numberOfArticles = ArticleModel::where('category_model_id', $this->category_model_id)->count();
			$numberOfMenuBundles = MenuBundleModel::where('category_model_id', $this->category_model_id)->count();
			$this->order = $numberOfArticles + $numberOfMenuBundles;

		}
	}
	
	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{

		// Delete its menu component blocks
		foreach ($this->menuComponentBlocksCollection as $menuComponentBlockModel) {
			$menuComponentBlockModel->delete();
		}

		return parent::delete();
	}

	/**
	 * Returns the category of the bundle
	 * 
	 * @return object
	 */
	public function categoryModel()
	{
		return $this->belongsTo('App\\Models\\CategoryModel');
	}

}
