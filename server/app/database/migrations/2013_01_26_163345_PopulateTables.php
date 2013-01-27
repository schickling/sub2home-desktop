<?php

use Illuminate\Database\Migrations\Migration;

class PopulateTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// AddressModel
		$ad1 = new AddressModel(array(
			'firstName' => 'Sebastian',
			'lastName' => 'Weigold',
			'street' => 'Maximilianstr 4',
			'streetAdditional' => 'Ums Eck',
			'postal' => 87700,
			'city' => 'Memmingen',
			'phone' => 112,
			'email' => 'office@my-sub.de'
			));

		$ad2 = new AddressModel(array(
			'firstName' => 'Max',
			'lastName' => 'Mustermann',
			'street' => 'Tuerkenstr 24',
			'streetAdditional' => 'Oben',
			'postal' => 13340,
			'city' => 'Berlin',
			'phone' => 112,
			'email' => 'julian@my-sub.de'
			));

		$ad3 = new AddressModel(array(
			'firstName' => 'Sebastian',
			'lastName' => 'Weigold',
			'street' => 'Maximilianstr 7',
			'postal' => 87700,
			'city' => 'Memmingen',
			'phone' => 112,
			'email' => 'store@my-sub.de'
			));

		$ad4 = new AddressModel(array(
			'firstName' => 'Max',
			'lastName' => 'Musterfrau',
			'street' => 'Memmingerstr 23',
			'postal' => 89073,
			'city' => 'Ulm'
			));

		$ad5 = new AddressModel(array(
			'street' => 'Blumenstr 17',
			'postal' => 10557,
			'city' => 'Berlin'
			));

		$ad6 = new AddressModel(array(
			'street' => 'Bahnhofs 3',
			'postal' => 10117,
			'city' => 'Berlin'
			));

		$ad7 = new AddressModel(array(
			'firstName' => 'Johannes',
			'lastName' => 'Schickling',
			'street' => 'Lerchenstr 4',
			'streetAdditional' => '4ter Stock',
			'postal' => 76185,
			'city' => 'Karlsruhe',
			'phone' => 112,
			'email' => 'offi23ce@my-sub.de'
			));

		$ad8 = new AddressModel(array(
			'firstName' => 'Johannes',
			'lastName' => 'Schickling',
			'street' => 'Kaiserallee 16',
			'streetAdditional' => '4ter Stock',
			'postal' => 76185,
			'city' => 'Karlsruhe',
			'phone' => 112,
			'email' => 'offi23ce@my-sub.de'
			));

		$ad9 = new AddressModel(array(
			'firstName' => 'Johannes',
			'lastName' => 'Schickling',
			'street' => 'Reihnstr 4',
			'streetAdditional' => '4ter Stock',
			'postal' => 76185,
			'city' => 'Karlsruhe',
			'phone' => 112,
			'email' => 'offi23ce@my-sub.de'
			));

		// Admin
		$u1 = new UserModel(array(
			'role' => 'admin',
			'email' => 'johannes.enjoy@gmail.com',
			'password' => Hash::make('test')
			));
		$u1->save();

		// Clients
		$u2 = new UserModel(array(
			'role' => 'client',
			'number' => 23,
			'password' => Hash::make('hallo'),
			'email' => 'office@my-sub.de'
			));
		$u2->save();
		$u2->addressModel()->save($ad1);

		$u3 = new UserModel(array(
			'role' => 'client',
			'number' => 25,
			'password' => Hash::make('hallo'),
			'email' => 'test@web.de'
			));
		$u3->save();
		$u3->addressModel()->save($ad2);

		$u4 = new UserModel(array(
			'role' => 'client',
			'number' => 215,
			'password' => Hash::make('hallo'),
			'email' => 'test2@web.de'
			));
		$u4->save();
		$u4->addressModel()->save($ad7);

		$u5 = new UserModel(array(
			'role' => 'client',
			'number' => 2115,
			'password' => Hash::make('haallo'),
			'email' => 'tesdgst2@web.de'
			));
		$u5->save();
		$u5->addressModel()->save($ad8);

		$u6 = new UserModel(array(
			'role' => 'client',
			'number' => 215,
			'password' => Hash::make('haaallo'),
			'email' => 'tesdsst2@web.de'
			));
		$u6->save();
		$u6->addressModel()->save($ad9);

		// store_models
		$s1 = new StoreModel(array(
			'title' => 'Memmingen',
			'number' => 41786,
			'isActive' => true,
			'isOpen' => true,
			'user_model_id' => $u2->id
			));
		$s1->save();

		$s2 = new StoreModel(array(
			'title' => 'Ulm 2',
			'number' => 23345,
			'isActive' => true,
			'user_model_id' => $u3->id
			));
		$s2->save();

		$s3 = new StoreModel(array(
			'title' => 'Berlin 1',
			'number' => 22345,
			'isActive' => true,
			'isOpen' => true,
			'user_model_id' => $u3->id
			));
		$s3->save();

		$s4 = new StoreModel(array(
			'title' => 'Berlin 2',
			'number' => 22355,
			'isActive' => true,
			'user_model_id' => $u3->id
			));
		$s4->save();

		$s5 = new StoreModel(array(
			'title' => 'Karlsruhe',
			'number' => 21355,
			'isActive' => true,
			'isOpen' => true,
			'user_model_id' => $u4->id
			));
		$s5->save();

		$s6 = new StoreModel(array(
			'title' => 'Karlsruhe 2',
			'number' => 25355,
			'isActive' => true,
			'isOpen' => true,
			'user_model_id' => $u5->id
			));
		$s6->save();

		$s7 = new StoreModel(array(
			'title' => 'Karlsruhe 3',
			'number' => 25345,
			'isActive' => true,
			'isOpen' => true,
			'user_model_id' => $u6->id
			));
		$s7->save();

		// Delivery Areas
		$da1 = new DeliveryAreaModel(array(
			'store_model_id' => $s5->id,
			'postal' => 76185,
			'description' => 'Liefergebiet 1'
			));
		$da1->save();

		$da2 = new DeliveryAreaModel(array(
			'store_model_id' => $s5->id,
			'postal' => 76185,
			'description' => 'Liefergebiet 2'
			));
		$da2->save();

		$da3 = new DeliveryAreaModel(array(
			'store_model_id' => $s7->id,
			'postal' => 76185,
			'description' => 'Liefergebiet 2'
			));
		$da3->save();

		$da4 = new DeliveryAreaModel(array(
			'store_model_id' => $s6->id,
			'postal' => 76185,
			'description' => 'Liefergebiet 2'
			));
		$da4->save();

		// Categories
		$c1 = new CategoryModel(array(
			'title' => 'Subs'
			));
		$c1->save();

		$c2 = new CategoryModel(array(
			'title' => 'Wraps'
			));
		$c2->save();

		$c3 = new CategoryModel(array(
			'title' => 'Salate'
			));
		$c3->save();

		$c4 = new CategoryModel(array(
			'title' => 'Getraenke'
			));
		$c4->save();

		$c5 = new CategoryModel(array(
			'title' => 'Cookies'
			));
		$c5->save();

		// Articles
		$a1 = new ArticleModel(array(
			'title' => 'Chicken Fajita',
			'info' => '15 cm',
			'category_model_id' => $c1->id,
			'description' => 'Test text',
			'price' => 3.49,
			'allowsMenuUpgrades' => true,
			'allowsIngredients' => true,
			'isPublished' => true
			));
		$a1->save();

		$a2 = new ArticleModel(array(
			'title' => 'Roasted Chicken Breast',
			'info' => '15 cm',
			'category_model_id' => $c1->id,
			'description' => 'Test text',
			'price' => 5.49,
			'allowsMenuUpgrades' => true,
			'allowsIngredients' => true,
			'isPublished' => true
			));
		$a2->save();
		
		$a3 = new ArticleModel(array(
			'title' => 'Chicken Fajita',
			'info' => '30 cm',
			'category_model_id' => $c2->id,
			'description' => 'Test text',
			'price' => 3.49,
			'allowsIngredients' => true,
			'allowsMenuUpgrades' => true,
			'isPublished' => true
			));
		$a3->save();

		// some more subs
		$articleNames = array('Chicken Teriyaki', 'Tuna', 'Ham', 'Bacon', 'Salami', 'Tropica');
		// 15 cm subs
		foreach ($articleNames as $articleName) {
			$article = new ArticleModel(array(
				'title' => $articleName,
				'info' => '15 cm',
				'category_model_id' => $c1->id,
				'description' => 'Test text',
				'price' => 3.49,
				'allowsIngredients' => true,
				'allowsMenuUpgrades' => true,
				'isPublished' => true
				));
			$article->save();
		}

		// 30 cm subs
		foreach ($articleNames as $articleName) {
			$article = new ArticleModel(array(
				'title' => $articleName,
				'info' => '30 cm',
				'category_model_id' => $c1->id,
				'description' => 'Test text',
				'price' => 3.49,
				'allowsIngredients' => true,
				'allowsMenuUpgrades' => true,
				'isPublished' => true
				));
			$article->save();
		}

		// drinks
		$articleNames = array('Coca Cola', 'Fanta', 'Sprite', 'Wasser', 'Bier');
		foreach ($articleNames as $articleName) {
			$article = new ArticleModel(array(
				'title' => $articleName,
				'category_model_id' => $c4->id,
				'price' => 1.49,
				'isPublished' => true
				));
			$article->save();
		}

		// cookies
		$articleNames = array('Macadamia', 'Choclate', 'Smarties', 'Peanut');
		foreach ($articleNames as $articleName) {
			$article = new ArticleModel(array(
				'title' => $articleName,
				'category_model_id' => $c5->id,
				'price' => 0.49,
				'isPublished' => true
				));
			$article->save();
		}

		// Ingredient categories
		$ic1 = new IngredientCategoryModel(array(
			'title' => 'Brot',
			'isSingle' => true,
			'isMandatory' => true
			));
		$ic1->save();

		$ic2 = new IngredientCategoryModel(array(
			'title' => 'Gemuese',
			'isSingle' => false
			));
		$ic2->save();

		$ic3 = new IngredientCategoryModel(array(
			'title' => 'Kaese',
			'isSingle' => false,
			'isMandatory' => true
			));
		$ic3->save();

		// Ingredients
		$i1 = new IngredientModel(array(
			'title' => 'Cheese Oregano',
			'ingredient_category_model_id' => $ic1->id,
			'price' => 0.99
			));
		$i1->save();

		$i2 = new IngredientModel(array(
			'title' => 'Salat',
			'price' => 0.50,
			'ingredient_category_model_id' => $ic2->id,
			));
		$i2->save();

		$i3 = new IngredientModel(array(
			'title' => 'Paprika',
			'price' => 0.20,
			'ingredient_category_model_id' => $ic2->id,
			));
		$i3->save();

		$i4 = new IngredientModel(array(
			'title' => 'Tomaten',
			'price' => 0.50,
			'ingredient_category_model_id' => $ic2->id,
			));
		$i4->save();

		$i5 = new IngredientModel(array(
			'title' => 'Streichkaese',
			'price' => 0.50,
			'ingredient_category_model_id' => $ic3->id,
			));
		$i5->save();

		$i6 = new IngredientModel(array(
			'title' => 'Scheibenkaese',
			'price' => 0.50,
			'ingredient_category_model_id' => $ic3->id,
			));
		$i6->save();

		$i7 = new IngredientModel(array(
			'title' => 'Sesam',
			'ingredient_category_model_id' => $ic1->id,
			'price' => 0.99
			));
		$i7->save();

		// Attach ingredients to articles
		$a1->ingredientsCollection()->attach($i1->id);
		$a1->ingredientsCollection()->attach($i2->id);
		$a1->ingredientsCollection()->attach($i3->id);
		$a1->ingredientsCollection()->attach($i4->id);
		$a1->ingredientsCollection()->attach($i5->id);
		$a1->ingredientsCollection()->attach($i6->id);

		$a2->ingredientsCollection()->attach($i1->id);
		$a2->ingredientsCollection()->attach($i2->id);
		$a2->ingredientsCollection()->attach($i3->id);
		$a2->ingredientsCollection()->attach($i4->id);
		$a2->ingredientsCollection()->attach($i5->id);
		$a2->ingredientsCollection()->attach($i6->id);
		$a2->ingredientsCollection()->attach($i7->id);

		$a3->ingredientsCollection()->attach($i1->id);
		$a3->ingredientsCollection()->attach($i2->id);
		$a3->ingredientsCollection()->attach($i4->id);

		// // Menu upgrades
		$mu1 = new MenuUpgradeModel(array(
			'title' => 'Sparmenu 1',
			'isPublished' => true,
			'price' => 2.00
			));
		$mu1->save();

		$mu2 = new MenuUpgradeModel(array(
			'title' => 'Sparmenu 2',
			'isPublished' => true,
			'price' => 2.00
			));
		$mu2->save();

		$mu3 = new MenuUpgradeModel(array(
			'title' => 'Sparmenu 3',
			'isPublished' => true,
			'price' => 2.00
			));
		$mu3->save();

		// // Attach menu upgrades to articles
		$a1->menuUpgradesCollection()->attach($mu1->id);
		$a1->menuUpgradesCollection()->attach($mu2->id);
		$a1->menuUpgradesCollection()->attach($mu3->id);

		$a2->menuUpgradesCollection()->attach($mu1->id);
		$a2->menuUpgradesCollection()->attach($mu2->id);
		$a2->menuUpgradesCollection()->attach($mu3->id);

		// // Menu bundles
		$mb1 = new MenuBundleModel(array(
			'category_model_id' => $c1->id,
			'title' => 'Kids Pak',
			'isPublished' => true,
			'price' => 2.00
			));
		$mb1->save();
		
		// Empty orders
		for ($i = 0; $i < 1000; $i++) {
			$order = new OrderModel(array(
				'payment' => 'cash',
				'store_model_id' => 1
				));
			$order->save();
			unset($order);
		}

		// Ordered articles
		$oa1 = new OrderedArticleModel(array(
			'article_model_id' => $a1->id,
			'amount' => 5
			));

		$oa2 = new OrderedArticleModel(array(
			'article_model_id' => $a2->id,
			'amount' => 9,
			));

		$oa3 = new OrderedArticleModel(array(
			'article_model_id' => $a2->id,
			'amount' => 1,
			));

		$oa4 = new OrderedArticleModel(array(
			'article_model_id' => $a1->id,
			'amount' => 1,
			));

		// Orders
		$o1 = new OrderModel(array(
			'payment' => 'cash',
			'store_model_id' => $s1->id,
			'isDelivered' => true
			));
		$o1->save();

		$o2 = new OrderModel(array(
			'payment' => 'paypal',
			'store_model_id' => $s1->id,
			'isDelivered' => true
			));
		$o2->save();

		// Assign ordered articles to orders
		// $o1->orderedArticlesCollection()->insert($oa1);
		// $o1->orderedArticlesCollection()->insert($oa2);
		// $o1->confirm();

		// $o2->orderedArticlesCollection()->insert($oa2);
		// $o2->orderedArticlesCollection()->insert($oa3);
		// $o2->confirm();
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}