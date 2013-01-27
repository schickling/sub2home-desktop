<?php

class Backend_Menu_Base_Controller extends Backend_Controller {

	/**
	 * Constructor
	 */
	function __construct() {
		Asset::add('jquery.iframe-transport', 'js/lib/jquery.iframe-transport.js', 'jquery');
		Asset::add('jquery.ui.widget', 'js/lib/jquery.ui.widget.js', 'jquery');
		Asset::add('jquery.fileupload', 'js/lib/jquery.fileupload.js', 'jquery');
		Asset::add('backend.menus', 'js/backend/menus.js', 'backbone');
		parent::__construct();
	}


	/**
	 * Uploads an menu image and processes it
	 * 
	 * @return object
	 */
	public function post_upload_image()
	{
		// get menu
		$class_name = Input::get('class_name');
		$menu_id = Input::get('menu_id');
		$menu = $class_name::find($menu_id);

		// Validate
		$rules = array('picture' => 'mimes:png');
		$validation = Validator::make(Input::file('image'), $rules);

		if ($validation->fails()) {
			
			Log::write('info', 'filetype error');

		} else {

			$filename = Str::random(32) . '.' . File::extension($_FILES['image']['name']);

			if (Input::upload('image', Menu_Base::$imageOriginalPath, $filename)) {

				// Create thumbs
				Bundle::start('resizer');

				Resizer::open(Menu_Base::$imageOriginalPath . $filename)
					->resize(70, 43, 'exact')
					->save(Menu_Base::$imageSmallPath . $filename, 100);

				Resizer::open(Menu_Base::$imageOriginalPath . $filename)
					->resize(302, 183, 'exact')
					->save(Menu_Base::$imageBigPath . $filename, 100);

				// Delete old images
				
				
				$old_filename = $menu->image;

				File::delete(Menu_Base::$imageOriginalPath . $old_filename);
				File::delete(Menu_Base::$imageSmallPath . $old_filename);
				File::delete(Menu_Base::$imageBigPath . $old_filename);

				// Save new image

				$menu->image = $filename;
				$menu->save();

				$data = array(
					'small_file' => Menu_Base::$publicImageSmallPath . $filename,
					'big_file' => Menu_Base::$publicImageBigPath . $filename
					);
			} else {
				throw new Exception("File not uploaded");
			}

		}

		return Response::make(json_encode($data), 200, array('Content-type' => 'application/json'));

	}

}