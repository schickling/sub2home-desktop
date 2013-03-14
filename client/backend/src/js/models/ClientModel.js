// Filename: js/models/ClientModel.js
define([
    'underscore',
    'backbone',
    'server',
    'models/AddressModel',
    'collections/StoresCollection'
    ], function (_, Backbone, server, AddressModel, StoresCollection) {

	var ClientModel = Backbone.Model.extend({

		defaults: {
			addressModel: null,
			storesCollection: null
		},

		urlRoot: server.getAddress() + 'clients',

		parse: function (response) {

			if (response.hasOwnProperty('addressModel')) {
				response.addressModel = new AddressModel(response.addressModel);
			}

			if (response.hasOwnProperty('storesCollection')) {
				response.storesCollection = new StoresCollection(response.storesCollection, {
					parse: true
				});
			}

			return response;
		},

		initialize: function () {
			var addressModel = this.get('addressModel');

			addressModel.on('change', function () {
				this.trigger('change');
			}, this);
		}

	});

	return ClientModel;

});