// Filename: src/js/models/clientModel.js
define([
    'underscore',
    'backbone',
    'models/AddressModel',
    'models/BankaccountModel',
    'collections/StoresCollection'
    ], function (_, Backbone, AddressModel, BankaccountModel, StoresCollection) {

	var ClientModel = Backbone.Model.extend({

		defaults: {
			bankaccountModel: null,
			storesCollection: null,
			addressModel: null,
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
		},

		getName: function () {
			var addressModel = this.get('addressModel');

			return addressModel.get('firstName');
		}

	});

	var clientModel = new ClientModel();

	clientModel.fetch({
		async: false
	});

	return clientModel;

});