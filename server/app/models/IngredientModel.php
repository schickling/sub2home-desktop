<?php

/**
 * IngredientModel class
 *
 * An ingredient of an article. May also have an additional price.
 */
class IngredientModel extends BaseModel
{

	public $timestamps = false;

	public $hidden = array('ingredient_category_model_id', 'order');

	/**
	 * Hook save
	 * 
	 * @return boolean
	 */
	public function save()
	{
		if ($this->ingredient_category_model_id === 0) {
			throw new Exception('IngredientModel "' . $this->title . '" needs an ingredient category');
		}

		$exists = $this->exists;

		if (!$exists) {
			// Calculate new order concerning a category
			$this->order = static::where('ingredient_category_model_id', $this->ingredient_category_model_id)->count();
		}

		$save = parent::save();

		// Inital save
		if (!$exists) {

			// Create custom ingredients
			$storesCollection = StoreModel::all();
			foreach ($storesCollection as $storeModel) {
				$customIngredientModel = new CustomIngredientModel(array(
					'store_model_id' => $storeModel->id,
					'ingredient_model_id' => $this->id,
					'price' => $this->price
					));
				$customIngredientModel->save();
			}

		}

		return $save;
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
		return $this->belongsToMany('ArticleModel');
	}

	/**
	 * Returns the ingredient category
	 * 
	 * @return object
	 */
	public function ingredientCategoryModel()
	{
		return $this->belongsTo('IngredientCategoryModel');
	}

	/**
	 * Returns the custom ingredients
	 * 
	 * @return object
	 */
	public function customIngredientsCollection()
	{
		return $this->hasMany('CustomIngredientModel');
	}

	/**
	 * Returns the custom ingredient respecting a specific store
	 * 
	 * @param  int $store_model_id
	 * @return object
	 */
	public function returnCustomModel($store_model_id)
	{
		return $this->customIngredientsCollection()->where('store_model_id', $store_model_id)->first();
	}

	/**
	 * Returns the price of the ingredient (respects custom ingredients)
	 *
	 * @param int $store_model_id
	 * @return int
	 */
	public function returnRealPrice($store_model_id)
	{
		$customIngredientModel = $this->returnCustomModel($store_model_id);

		if ($customIngredientModel->hasOwnPrice) {
			return $customIngredientModel->price;
		} else {
			return $this->price;
		}
	}

}
