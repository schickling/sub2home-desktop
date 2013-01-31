<?php

$aritcleIngredientsPairs = array (

	array (
		'article_model_id'		=> 1, // BBQ Rip (6 inch)
		'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)
		),

	array (
		'article_model_id'		=> 2, // Chicken Fajita (6 inch)
		'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)
		)

	);



$parsedArray = array();

foreach ($aritcleIngredientsPairs as $aritcleIngredientsPair) {
	foreach ($aritcleIngredientsPair['ingredient_model_ids'] as $ingredient_model_id) {
		array_push($parsedArray, array(
			'article_model_id'		=> $aritcleIngredientsPair['article_model_id'],
			'ingredient_model_id'	=> $ingredient_model_id
			));
	}
}


return $parsedArray;