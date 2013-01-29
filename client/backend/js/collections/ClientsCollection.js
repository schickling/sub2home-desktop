// Filename: js/models/ClientsCollection.js
define([
	'underscore',
	'backbone',
	'server',
	'models/ClientModel'
	], function (_, Backbone, server, ClientModel) {

	var ClientsCollection = Backbone.Collection.extend({

		model: ClientModel,

		url: server.getAddress() + 'clients'

	});

	return ClientsCollection;

});