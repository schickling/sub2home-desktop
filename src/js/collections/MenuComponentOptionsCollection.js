// Filename: src/js/collections/MenuComponentOptionsCollection.js
define([
	'underscore',
	'backbone',
	'models/MenuComponentOptionModel'
	], function (_, Backbone, MenuComponentOptionModel) {

	"use strict";

	var MenuComponentOptionsCollection = Backbone.Collection.extend({
		model: MenuComponentOptionModel
	});

	return MenuComponentOptionsCollection;
});