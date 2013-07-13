// Filename: src/js/collections/store/selection/MenuComponentOptionArticlesCollection.js
define([
	'underscore',
	'backbone',
	'models/MenuComponentOptionArticleModel'
	], function (_, Backbone, MenuComponentOptionArticleModel) {

	"use strict";

	var MenuComponentOptionArticlesCollection = Backbone.Collection.extend({
		model: MenuComponentOptionArticleModel
	});

	return MenuComponentOptionArticlesCollection;
});