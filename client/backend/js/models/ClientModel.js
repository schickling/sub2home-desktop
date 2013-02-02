// Filename: js/models/ClientModel.js
define([
	'underscore',
	'backbone',
	'models/AddressModel',
	'collections/StoresCollection'
	], function (_, Backbone, AddressModel, StoresCollection) {

	var ClientModel = Backbone.Model.extend({

		defaults: {
			addressModel: null,
			storesCollection: null
		},

		urlRoot: '/api/backend/clients',

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