<?php

$menuComponentOptionArticlesPairs = array (

// Sparmenu --------------------
// -----------------------------

	array (
		'menu_component_option_model_id'	=> 1, // Getraenke
		'article_model_ids'					=> array(62, 63, 64, 65, 66, 67, 68, 69, 70)
		),

	array (
		'menu_component_option_model_id'	=> 2, // Cookies
		'article_model_ids'					=> array(46, 47, 48, 49)
		),

	array (
		'menu_component_option_model_id'	=> 3, // Chips
		'article_model_ids'					=> array(54, 55, 56, 57, 58, 59, 60, 61)
		),

// Kids Pak --------------------
// -----------------------------

	array (
		'menu_component_option_model_id'	=> 4, // Subs
		'article_model_ids'					=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)
		),

	array (
		'menu_component_option_model_id'	=> 5, // Getraenke
		'article_model_ids'					=> array(62, 63, 64, 65, 66, 67, 68, 69, 70)
		),

	array (
		'menu_component_option_model_id'	=> 6, // Cookies
		'article_model_ids'					=> array(46, 47, 48, 49)
		)



	);



$parsedArray = array();

foreach ($menuComponentOptionArticlesPairs as $menuComponentOptionArticlesPair) {
	foreach ($menuComponentOptionArticlesPair['article_model_ids'] as $article_model_id) {
		array_push($parsedArray, array(
			'menu_component_option_model_id'	=> $menuComponentOptionArticlesPair['menu_component_option_model_id'],
			'article_model_id'					=> $article_model_id
			));
	}
}


return $parsedArray;