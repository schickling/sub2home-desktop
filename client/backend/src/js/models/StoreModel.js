// Filename: js/models/StoreModel.js
define([
	'underscore',
	'backbone',
	'server',
	'models/AddressModel'
	], function (_, Backbone, server, AddressModel) {

	var StoreModel = Backbone.Model.extend({

		defaults: {
			addressModel: null
		},

		urlRoot: server.getAddress() + 'stores',

		parse: function (response) {

			if (response.hasOwnProperty('addressModel')) {
				response.addressModel = new AddressModel(response.addressModel);
			}

			return response;
		}


	});

	return StoreModel;

});