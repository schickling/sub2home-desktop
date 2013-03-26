<?php namespace App\Models;

/**
 * Ingredient category class
 */
class IngredientCategoryModel extends BaseModel
{

	public $timestamps = false;

	protected $table = 'ingredient_category_models';

	protected $fillable = array('order', 'title', 'smallImage', 'icon', 'isSingle', 'isMandatory');

	protected function beforeFirstSave()
	{
		// Calculate new order concerning a category
		$this->order = static::count();
	}

	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Readjust order of other categories
		foreach (static::where('order', '>', $this->order)->get() as $ingredientCategoryModel) {
			$ingredientCategoryModel->order = $ingredientCategoryModel->order - 1;
			$ingredientCategoryModel->save();
		}

		// Delete all belonging ingredientsCollection
		$this->ingredientsCollection()->delete();

		return parent::delete();
	}

	public function ingredientsCollection()
	{
		return $this->hasMany('App\\Models\\IngredientModel');
	}
}