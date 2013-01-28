// Filename: js/models/StoreModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var StoreModel = Backbone.Model.extend({

		urlRoot: '/api/backend/stores'

	});

	return StoreModel;

});