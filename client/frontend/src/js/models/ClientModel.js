// Filename: src/js/models/ClientModel.js
define([
	'underscore',
	'backbone',
	'models/AddressModel',
	'collections/StoresCollection'
	], function (_, Backbone, AddressModel, StoresCollection) {

	var ClientModel = Backbone.Model.extend({

		defaults: {
			password: '',
			email: '',
			number: 0
		},

		urlRoot: '/api/frontend/clients',

		parse: function (response) {

			if (response.hasOwnProperty('storesCollection')) {
				response.storesCollection = new StoresCollection(response.storesCollection);
			}

			if (response.hasOwnProperty('addressModel')) {
				response.addressModel = new AddressModel(response.addressModel);
			}

			return response;
		}

	});

	return ClientModel;

});