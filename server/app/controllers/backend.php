<?php

class Backend_Controller extends Base_Controller {

	public function __construct() {
		// $this->filter('before', 'backend');

		Asset::add('jquery', 'js/lib/jquery/jquery.js');
		Asset::add('jquery.browser.selector', 'js/lib/jquery/jquery.browser.selector.js', 'jquery');
		Asset::add('underscore', 'js/lib/underscore/underscore.js', 'jquery');
		Asset::add('backbone', 'js/lib/backbone/backbone.0.9.2.js', 'jquery');
		Asset::add('backend', 'css/backend.css');
		
		parent::__construct();
	}

}