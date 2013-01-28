// Filename: js/models/ClientModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var ClientModel = Backbone.Model.extend({

		urlRoot: '/api/backend/clients'

	});

	return ClientModel;

});