// Filename: js/models/AddressModel.js
define([
    'underscore',
    'backbone',
    'server'
    ], function (_, Backbone, server) {

	var AddressModel = Backbone.Model.extend({

		urlRoot: server.getAddress() + 'addresses'

	});

	return AddressModel;

});