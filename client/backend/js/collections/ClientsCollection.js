// Filename: js/models/ClientsCollection.js
define([
	'underscore',
	'backbone',
	'models/ClientModel'
	], function (_, Backbone, ClientModel) {

	var ClientsCollection = Backbone.Collection.extend({

		model: ClientModel

	});

	return ClientsCollection;

});