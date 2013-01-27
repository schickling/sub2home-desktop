// Filename: src/js/collections/MenuComponentOptionsCollection.js
define([
	'underscore',
	'backbone',
	'models/MenuComponentOptionModel'
	], function (_, Backbone, MenuComponentOptionModel) {

	var MenuComponentOptionsCollection = Backbone.Collection.extend({
		model: MenuComponentOptionModel
	});

	return MenuComponentOptionsCollection;
});