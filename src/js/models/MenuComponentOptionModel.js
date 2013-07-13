// Filename: src/js/models/MenuComponentOptionModel.js
define([
	'underscore',
	'backbone',
	'collections/MenuComponentOptionArticlesCollection'
	], function (_, Backbone, MenuComponentOptionArticlesCollection) {

	"use strict";

	var MenuComponentOptionModel = Backbone.Model.extend({

		defaults: {
			menuComponentOptionArticlesCollection: null
		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (this.get('menuComponentOptionArticlesCollection')) {
				attributes.menuComponentOptionArticlesCollection = attributes.menuComponentOptionArticlesCollection.toJSON();
			}

			delete attributes.orderedItemModel;

			return attributes;
		},

		parse: function (response) {

			if (response.hasOwnProperty('menuComponentOptionArticlesCollection') && response.menuComponentOptionArticlesCollection !== null) {
				response.menuComponentOptionArticlesCollection = new MenuComponentOptionArticlesCollection(response.menuComponentOptionArticlesCollection, {
					parse: true
				});
			}

			return response;
		}

	});

	return MenuComponentOptionModel;

});