// Filename: src/js/collections/MenuUpgradesCollection.js
define([
    'underscore',
    'backbone',
    'models/MenuUpgradeModel'
    ], function (_, Backbone, MenuUpgradeModel) {

	var MenuUpgradesCollection = Backbone.Collection.extend({

		model: MenuUpgradeModel,

		url: function() {
			return 'stores/storeAlias/menuupgrades';
		}

	});

	return MenuUpgradesCollection;
});