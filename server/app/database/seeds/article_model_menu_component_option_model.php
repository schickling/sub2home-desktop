<?php

$menuComponentOptionArticlesPairs = array (

	array (
		'menu_component_option_model_id'	=> 4, // Cookies
		'article_model_ids'					=> array(46, 47, 48, 49)
		),

	array (
		'menu_component_option_model_id'	=> 7, // Chips
		'article_model_ids'					=> array(54, 55, 56, 57, 58, 59, 60, 61)
		),

	array (
		'menu_component_option_model_id'	=> 8, // Getraenke
		'article_model_ids'					=> array(62, 63, 64, 65, 66, 67, 68, 69, 70)
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