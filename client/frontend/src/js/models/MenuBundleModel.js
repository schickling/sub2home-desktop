// Filename: src/js/models/MenuBundleModel.js
define([
    'underscore',
    'backbone',
    'global',
    'models/MenuModel'
    ], function (_, Backbone, global, MenuModel) {

	var MenuBundleModel = MenuModel.extend({

		defaults: {
			menuComponentBlocksCollection: null,
			title: '',
			description: '',
			smallImage: '',
			largeImage: '',
			price: '',

			// for assortment
			isActive: false,
			customPrice: 0,
			buyed: 0
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/menubundles';
		}

	});

	return MenuBundleModel;

});