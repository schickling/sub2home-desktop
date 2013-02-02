define([
	'underscore',
	'backbone',
	'global'
	], function (_, Backbone, global) {

	var AddressModel = Backbone.Model.extend({

		defaults: {
			firstName: '',
			lastName: '',
			street: '',
			streetAdditional: '',
			city: '',
			phone: '',
			email: '',
			postal: 0
		},

		url: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/address';
		}
	});

	return AddressModel;

});