// Filename: src/js/models/ClientModel.js
define([
    'underscore',
    'backbone',
    'models/AddressModel',
    'models/BankaccountModel',
    'collections/StoresCollection'
    ], function (_, Backbone, AddressModel, BankaccountModel, StoresCollection) {

	var ClientModel = Backbone.Model.extend({

		defaults: {
			password: '',
			email: '',
			number: 0
		},

		urlRoot: '/api/frontend/clients',

		parse: function (response) {

			if (response.hasOwnProperty('storesCollection')) {
				response.storesCollection = new StoresCollection(response.storesCollection, {
					parse: true
				});
			}

			if (response.hasOwnProperty('addressModel')) {
				response.addressModel = new AddressModel(response.addressModel);
			}

			if (response.hasOwnProperty('bankaccountModel')) {
				response.bankaccountModel = new BankaccountModel(response.bankaccountModel);
			}

			return response;
		}

	});

	return ClientModel;

});