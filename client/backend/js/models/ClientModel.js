// Filename: js/models/ClientModel.js
define([
	'underscore',
	'backbone',
	'models/AddressModel'
	], function (_, Backbone, AddressModel) {

	var ClientModel = Backbone.Model.extend({

		urlRoot: '/api/backend/clients',

		parse: function (response) {

			if (response.hasOwnProperty('addressModel')) {
				response.addressModel = new AddressModel(response.addressModel);
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