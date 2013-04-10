// Filename: src/js/collections/MenuBundlesCollection.js
define([
    'underscore',
    'backbone',
    'global',
    'models/MenuBundleModel'
    ], function (_, Backbone, global, MenuBundleModel) {

	var MenuBundlesCollection = Backbone.Collection.extend({

		model: MenuBundleModel,

		url: function() {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/menubundles';
		}

	});

	return MenuBundlesCollection;
});