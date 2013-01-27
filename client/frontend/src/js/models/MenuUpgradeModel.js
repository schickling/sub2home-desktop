// Filename: src/js/models/MenuUpgradeModel.js
define([
	'underscore',
	'backbone',
	'collections/MenuComponentBlocksCollection'
	], function (_, Backbone, MenuComponentBlocksCollection) {

	var MenuUpgradeModel = Backbone.Model.extend({

		defaults: {
			menuComponentBlocksCollection: null
		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (this.get('menuComponentBlocksCollection')) {
				attributes.menuComponentBlocksCollection = attributes.menuComponentBlocksCollection.toJSON();
			}

			return attributes;
		},

		parse: function (response) {
			if (response.hasOwnProperty('menuComponentBlocksCollection') && response.menuComponentBlocksCollection !== null) {
				response.menuComponentBlocksCollection = new MenuComponentBlocksCollection(response.menuComponentBlocksCollection, {
					parse: true
				});
			}

			return response;
		}

	});

	return MenuUpgradeModel;

});