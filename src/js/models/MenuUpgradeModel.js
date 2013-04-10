// Filename: src/js/models/MenuUpgradeModel.js
define([
    'underscore',
    'backbone',
    'global',
    'models/MenuModel'
    ], function (_, Backbone, global, MenuModel) {

	var MenuUpgradeModel = MenuModel.extend({

		defaults: {
			menuComponentBlocksCollection: null,
			title: '',
			description: '',
			price: '',

			// for assortment
			isActive: false,
			customPrice: 0,
			buyed: 0
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/menuupgrades';
		}

	});

	return MenuUpgradeModel;

});