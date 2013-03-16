// Filename: src/js/collections/MenusCollection.js
define([
    'underscore',
    'backbone',
    'models/MenuModel'
    ], function (_, Backbone, MenuModel) {

	var MenusCollection = Backbone.Collection.extend({

		model: MenuModel

	});

	return MenusCollection;
});