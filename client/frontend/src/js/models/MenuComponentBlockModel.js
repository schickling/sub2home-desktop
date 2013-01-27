// Filename: src/js/models/MenuComponentBlockModel.js
define([
	'underscore',
	'backbone',
	'collections/MenuComponentOptionsCollection'
	], function (_, Backbone, MenuComponentOptionsCollection) {

	var MenuComponentBlockModel = Backbone.Model.extend({

		defaults: {
			menuComponentOptionsCollection: null
		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (this.get('menuComponentOptionsCollection')) {
				attributes.menuComponentOptionsCollection = attributes.menuComponentOptionsCollection.toJSON();
			}

			return attributes;
		},

		parse: function (response) {
			if (response.hasOwnProperty('menuComponentOptionsCollection') && response.menuComponentOptionsCollection !== null) {
				response.menuComponentOptionsCollection = new MenuComponentOptionsCollection(response.menuComponentOptionsCollection, {
					parse: true
				});
			}

			return response;
		}
		
	});

	return MenuComponentBlockModel;

});