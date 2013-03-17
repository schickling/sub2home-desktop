// Filename: src/js/collections/MenuUpgradesCollection.js
define([
    'underscore',
    'backbone',
    'global',
    'models/MenuUpgradeModel'
    ], function (_, Backbone, global, MenuUpgradeModel) {

	var MenuUpgradesCollection = Backbone.Collection.extend({

		model: MenuUpgradeModel,

		url: function() {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/menuupgrades';
		}

	});

	return MenuUpgradesCollection;
});