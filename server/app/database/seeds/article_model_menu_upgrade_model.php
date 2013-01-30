<?php

$menuUpgradeArticlesPairs = array (

	array (
		'menu_upgrade_model_id'		=> 1, // Sparmenu
		'article_model_ids'			=> array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
		)

	);



$parsedArray = array();

foreach ($menuUpgradeArticlesPairs as $menuUpgradeArticlesPair) {
	foreach ($menuUpgradeArticlesPair['article_model_ids'] as $article_model_id) {
		array_push($parsedArray, array(
			'menu_upgrade_model_id'		=> $menuUpgradeArticlesPair['menu_upgrade_model_id'],
			'article_model_id'			=> $article_model_id
			));
	}
}


return $parsedArray;