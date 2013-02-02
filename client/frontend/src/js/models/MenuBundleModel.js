// Filename: src/js/models/MenuBundleModel.js
define([
	'underscore',
	'backbone',
	'models/MenuModel'
	], function (_, Backbone, MenuModel) {

	var MenuBundleModel = MenuModel.extend({

		urlRoot: function () {
			return '/api/frontend/stores/' + window.localStorage.getItem('storeAlias') + '/menubundles';
		}

	});

	return MenuBundleModel;

});