<?php

class Backend_Ingredients_Controller extends Backend_Controller {

	/**
	 * Constructor
	 */
	function __construct() {
		Asset::add('jquery.iframe-transport', 'js/lib/jquery.iframe-transport.js', 'jquery');
		Asset::add('jquery.ui.widget', 'js/lib/jquery.ui.widget.js', 'jquery');
		Asset::add('jquery.fileupload', 'js/lib/jquery.fileupload.js', 'jquery');
		Asset::add('backend.ingredients', 'js/backend/ingredients.js', 'backbone');
		parent::__construct();
	}

	/**
	 * Returns a view of all ingredients
	 * 
	 * @return object
	 */
	public function get_index()
	{

		$view = View::make('backend.ingredients');

		$ingredient_categories = Ingredient_Category::order_by('order')->get();

		foreach ($ingredient_categories as $ingredient_category) {
			$ingredient_category->order = (int) $ingredient_category->order;
			$ingredient_category->including = (int) $ingredient_category->including;
			$ingredient_category->isSingle = (bool) $ingredient_category->isSingle;

			foreach ($ingredient_category->ingredients as $ingredient) {
				$ingredient->price = (int) $ingredient->price;
				$ingredient->order = (int) $ingredient->order;

				// Prepare image url
				if (!empty($ingredient->image)) {
					$ingredient->small_image = Ingredient::$publicImageSmallPath . $ingredient->small_image;
				}
			}
		}

		$view->ingredient_categories = eloquent_to_json($ingredient_categories);

		return $view;
	}

	/**
	 * Creates a new ingredient
	 * 
	 * @return string
	 */
	public function post_create()
	{
		
		$input = Input::json();

		$ingredient = new Ingredient(array(
				'ingredient_category_id' => $input->ingredient_category_id,
				'title' => 'Neue Zutat'
			));

		$ingredient->save();

		return eloquent_to_json($ingredient);
	}

	/**
	 * Removes an ingredient and the ingredients belonging to articles
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$ingredient_id = (int) URI::segment(3);
		$ingredient = Ingredient::find($ingredient_id);

		$ingredient->delete();
	}

	/**
	 * Updates an ingredient field
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$ingredient_id = (int) URI::segment(3);

		$ingredient = Ingredient::find($ingredient_id);

		$ingredient->title = $input->title;
		$ingredient->price = $input->price;
		$ingredient->order = $input->order;

		$ingredient->save();
	}

	/**
	 * Uploads an ingredient image and processes it
	 * 
	 * @return object
	 */
	public function post_upload_image()
	{
		
		// Validate
		$rules = array('picture' => 'mimes:png');
		$validation = Validator::make(Input::file('image'), $rules);

		if ($validation->fails()) {
			
			Log::write('info', 'filetype error');

		} else {

			$filename = Str::random(32) . '.' . File::extension($_FILES['image']['name']);

			if (Input::upload('image', Ingredient::$imageOriginalPath, $filename)) {

				// Create thumbs
				Bundle::start('resizer');

				Resizer::isOpen(Ingredient::$imageOriginalPath . $filename)
					->resize(70, 43, 'exact')
					->save(Ingredient::$imageSmallPath . $filename, 100);

				// Delete old images
				$ingredient = Ingredient::find(Input::get('ingredient_id'));
				$old_filename = $ingredient->image;

				File::delete(Ingredient::$imageOriginalPath . $old_filename);
				File::delete(Ingredient::$imageSmallPath . $old_filename);

				// Save new image
				$ingredient->image = $filename;
				$ingredient->save();

				$data = array(
					'file' => Ingredient::$publicImageSmallPath . $filename
					);

			} else {
				throw new Exception("File not uploaded");
			}

		}

		return Response::make(json_encode($data), 200, array('Content-type' => 'application/json'));

	}

}