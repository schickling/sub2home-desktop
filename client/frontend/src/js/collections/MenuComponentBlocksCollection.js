// Filename: src/js/collections/MenuComponentBlocksCollection.js
define([
	'underscore',
	'backbone',
	'models/MenuComponentBlockModel'
	], function (_, Backbone, MenuComponentBlockModel) {

	var MenuComponentBlocksCollection = Backbone.Collection.extend({
		model: MenuComponentBlockModel
	});

	return MenuComponentBlocksCollection;
});