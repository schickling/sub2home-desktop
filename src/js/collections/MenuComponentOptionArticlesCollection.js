// Filename: src/js/collections/store/selection/MenuComponentOptionArticlesCollection.js
define([
	'underscore',
	'backbone',
	'models/MenuComponentOptionArticleModel'
	], function (_, Backbone, MenuComponentOptionArticleModel) {

	var MenuComponentOptionArticlesCollection = Backbone.Collection.extend({
		model: MenuComponentOptionArticleModel
	});

	return MenuComponentOptionArticlesCollection;
});