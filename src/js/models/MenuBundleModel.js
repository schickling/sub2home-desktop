// Filename: src/js/models/MenuBundleModel.js
define([
    'underscore',
    'backbone',
    'models/MenuModel'
    ], function (_, Backbone, MenuModel) {

	"use strict";

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
			return 'stores/storeAlias/menubundles';
		}

	});

	return MenuBundleModel;

});