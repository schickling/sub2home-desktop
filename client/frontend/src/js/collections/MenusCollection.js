// Filename: src/js/collections/MenusCollection.js
define([
    'underscore',
    'backbone',
    'global',
    'models/MenuModel'
    ], function (_, Backbone, global, MenuModel) {

	var MenusCollection = Backbone.Collection.extend({

		model: MenuModel,

		url: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/menus';
		}

	});

	return MenusCollection;
});