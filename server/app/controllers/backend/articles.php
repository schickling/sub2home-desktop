<?php

class Backend_Articles_Controller extends Backend_Controller {

	/**
	 * Constructor
	 */
	function __construct() {
		Asset::add('jquery.iframe-transport', 'js/lib/jquery/jquery.iframe-transport.js', 'jquery');
		Asset::add('jquery.ui.widget', 'js/lib/jquery/jquery.ui.widget.js', 'jquery');
		Asset::add('jquery.fileupload', 'js/lib/jquery/jquery.fileupload.js', 'jquery');
		Asset::add('backend.articles', 'js/backend/articles.js', 'backbone');
		parent::__construct();

		// Set category from URL
		$category_alias = URI::segment(3);
		$this->category = Category::where_alias($category_alias)->first();
	}

	/**
	 * Returns a view with all articles belonging to a category
	 * 
	 * @param  string $category_alias
	 * @return object
	 */
	public function get_index()
	{
		if ($this->category == null) {
			return Response::error('404');
		}

		$view = View::make('backend.articles');

		$articles = Article::where_category_id($this->category->id)->get();

		foreach ($articles as &$article) {

			// Add ids of its ingredients
			$ingredient_ids = array();
			foreach ($article->ingredients as $ingredient) {
				array_push($ingredient_ids, (int) $ingredient->id);
			}
			$article->ingredient_ids = $ingredient_ids;

			// Add ids of its menu upgrades
			$menu_upgrade_ids = array();
			foreach ($article->menu_upgrades as $menu_upgrade) {
				array_push($menu_upgrade_ids, (int) $menu_upgrade->id);
			}
			$article->menu_upgrade_ids = $menu_upgrade_ids;

			$article->published = (bool) $article->published;
			$article->allows_ingredients = (bool) $article->allows_ingredients;
			$article->allows_deposit = (bool) $article->allows_deposit;
			$article->allows_menu_upgrades = (bool) $article->allows_menu_upgrades;
			$article->price = (int) $article->price;
			$article->deposit = (int) $article->deposit;
			$article->buyed = (int) $article->buyed;

			// Format date
			$date = new DateTime($article->updated_at);
			$article->updated_at = $date->format('d.m.Y');

			// Prepare image urls
			if (!empty($article->image)) {
				$article->image_small = Article::$publicImageSmallPath . $article->image;
				$article->image_big = Article::$publicImageBigPath . $article->image;
			}

			$article = $article->attributes;

		}

		$view->articles = json_encode($articles);

		$view->ingredients_categories = Ingredient_Category::all();

		$view->menu_upgrades = Menu_Upgrade::all();

		return $view;
	}

	/**
	 * Adds/removes an ingredient to an article
	 * 
	 * @return void
	 */
	public function post_toggle_ingredient()
	{
		
		$article_id = Input::get('article_id');
		$ingredient_id = Input::get('ingredient_id');
		$add = Input::get('add');

		$article = Article::find($article_id);

		if ($add == "true") {
			$article->ingredients()->attach($ingredient_id);
		} else {
			$article->ingredients()->detach($ingredient_id);
		}

	}

	/**
	 * Adds/removes an menu upgrade to an article
	 * 
	 * @return void
	 */
	public function post_toggle_menu_upgrade()
	{
		
		$article_id = Input::get('article_id');
		$menu_upgrade_id = Input::get('menu_upgrade_id');
		$add = Input::get('add');

		$article = Article::find($article_id);

		if ($add == "true") {
			$article->menu_upgrades()->attach($menu_upgrade_id);
		} else {
			$article->menu_upgrades()->detach($menu_upgrade_id);
		}

	}

	/**
	 * Updates an article field
	 * 
	 * @return void
	 */
	public function put_update()
	{
		
		$input = Input::json();

		$article_id = (int) URI::segment(4);

		$article = Article::find($article_id);

		$article->title = $input->title;
		$article->description = $input->description;
		$article->price = $input->price;
		$article->deposit = $input->deposit;
		$article->published = $input->published;
		$article->allows_ingredients = $input->allows_ingredients;
		$article->allows_deposit = $input->allows_deposit;
		$article->allows_menu_upgrades = $input->allows_menu_upgrades;

		$article->save();
	}

	/**
	 * Creates an new article
	 * 
	 * @return object
	 */
	public function post_create()
	{
		if ($this->category == null) {
			return Response::error('404');
		}

		$input = Input::json();

		$article = new Article(array(
				'category_id' => $this->category->id,
				'title' => 'Artikel',
				'price' => 0,
				'deposit' => 0,
				'description' => '',
				'published' => false,
				'allows_deposit' => false,
				'allows_ingredients' => false,
				'allows_menu_upgrades' => false
			));

		$article->save();

		// Format date
		$article->updated_at = $article->updated_at->format('d.m.Y');

		$article->buyed = (int) $article->buyed;

		return eloquent_to_json($article);
	}

	/**
	 * Uploads an article image and processes it
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

			if (Input::upload('image', Article::$imageOriginalPath, $filename)) {

				// Create thumbs
				Bundle::start('resizer');

				Resizer::isOpen(Article::$imageOriginalPath . $filename)
					->resize(70, 43, 'exact')
					->save(Article::$imageSmallPath . $filename, 100);

				Resizer::isOpen(Article::$imageOriginalPath . $filename)
					->resize(265, 157, 'exact')
					->save(Article::$imageBigPath . $filename, 100);

				// Delete old images
				
				$article = Article::find(Input::get('article_id'));
				$old_filename = $article->image;

				File::delete(Article::$imageOriginalPath . $old_filename);
				File::delete(Article::$imageSmallPath . $old_filename);
				File::delete(Article::$imageBigPath . $old_filename);

				// Save new image

				$article->image = $filename;
				$article->save();

				$data = array(
					'small_file' => Article::$publicImageSmallPath . $filename,
					'big_file' => Article::$publicImageBigPath . $filename
					);
			} else {
				throw new Exception("File not uploaded");
			}

		}

		return Response::make(json_encode($data), 200, array('Content-type' => 'application/json'));

	}

	/**
	 * Removes an article and all custom articles beloning to this article
	 * 
	 * @return void
	 */
	public function delete_destroy()
	{
		
		$article_id = (int) URI::segment(3);
		$article = Article::find($article_id);

		$article->delete();
	}

}