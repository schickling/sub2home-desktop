// Filename: src/js/models/MenuUpgradeModel.js
define([
    'underscore',
    'backbone',
    'models/MenuModel'
    ], function (_, Backbone, MenuModel) {

	"use strict";

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
			return 'stores/storeAlias/menuupgrades';
		}

	});

	return MenuUpgradeModel;

});