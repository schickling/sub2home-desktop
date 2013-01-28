<?php

$aritcleIngredientsPairs = array (

	array (
		'article_model_id'		=> 1, // BBQ Rip (6 inch)
		'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
		),

	array (
		'article_model_id'		=> 2, // Chicken Fajita (6 inch)
		'ingredient_model_ids'	=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
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