// Filename: src/js/models/MenuBundleModel.js
define([
	'underscore',
	'backbone',
	'global',
	'models/MenuModel'
	], function (_, Backbone, global, MenuModel) {

	var MenuBundleModel = MenuModel.extend({

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/menubundles';
		}

	});

	return MenuBundleModel;

});