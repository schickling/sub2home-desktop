<?php namespace App\Models;

/**
 * IngredientModel class
 *
 * An ingredient of an article. May also have an additional price.
 */
class IngredientModel extends ItemModel
{

	protected $table = 'ingredient_models';

	protected $hidden = array(
		'ingredient_category_model_id',
		'order',
		'buyed',
		'isPublished',
		'created_at',
		'updated_at',
		'pivot'
		);

	protected $fillable = array(
		'order',
		'title',
		'description',
		'shortTitle',
		'shortcut',
		'smallImage',
		'largeImage',
		'price',
		'isPublished',
		'ingredient_category_model_id'
		);

	protected function beforeFirstSave()
	{
		// Calculate new order concerning a category
		$this->order = static::where('ingredient_category_model_id', $this->ingredient_category_model_id)->count();
	}

	/**
	 * Hook delete
	 * 
	 * @return int
	 */
	public function delete()
	{
		// Readjust order
		foreach (static::where('order', '>', $this->order)->get() as $ingredientModel) {
			$ingredientModel->order = $ingredientModel->order - 1;
			$ingredientModel->save();
		}

		// Delete relationships with related articlesCollection
		$this->articlesCollection()->delete();

		// Delete all belonging custom ingredients
		foreach ($this->customIngredientsCollection as $customIngredientModel) {
			$customIngredientModel->delete();
		}

		return parent::delete();
	}

	/**
	 * Returns the belonging articlesCollection of the ingredient
	 * 
	 * @return object
	 */
	public function articlesCollection()
	{
		return $this->belongsToMany('App\\Models\\ArticleModel')->withPivot('isPreset');
	}

	/**
	 * Returns the ingredient category
	 * 
	 * @return object
	 */
	public function ingredientCategoryModel()
	{
		return $this->belongsTo('App\\Models\\IngredientCategoryModel');
	}

	/**
	 * Returns the custom ingredients
	 * 
	 * @return object
	 */
	public function customIngredientsCollection()
	{
		return $this->hasMany('App\\Models\\CustomIngredientModel');
	}
	
	/**
	 * Returns the custom ingredient respecting a specific store
	 * 
	 * @param  int $store_model_id
	 * @return object
	 */
	public function returnCustomModel($store_model_id)
	{
		$customIngredientModel = $this->customIngredientsCollection()->where('store_model_id', $store_model_id)->first();

		// lazy initialize
		if ($customIngredientModel == null) {
			$customIngredientModel = new CustomIngredientModel(array(
				'isActive' => true,
				'store_model_id' => $store_model_id,
				'price' => $this->price
				));
			$this->customIngredientsCollection()->save($customIngredientModel);
		}

		return $customIngredientModel;
	}

}
