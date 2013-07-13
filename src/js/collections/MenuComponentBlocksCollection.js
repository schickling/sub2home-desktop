// Filename: src/js/collections/MenuComponentBlocksCollection.js
define([
	'underscore',
	'backbone',
	'models/MenuComponentBlockModel'
	], function (_, Backbone, MenuComponentBlockModel) {

	"use strict";

	var MenuComponentBlocksCollection = Backbone.Collection.extend({
		model: MenuComponentBlockModel
	});

	return MenuComponentBlocksCollection;
});