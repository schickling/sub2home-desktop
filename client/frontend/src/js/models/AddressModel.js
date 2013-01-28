define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

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
			return '/api/frontend/stores/' + window.localStorage.getItem('storeAlias') + '/address';
		}
	});

	return AddressModel;

});