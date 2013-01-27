define([
	'underscore',
	'backbone',
	'models/stateModel'
	], function (_, Backbone, stateModel) {

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
			return '/api/stores/' + stateModel.get('storeAlias') + '/address';
		}
	});

	return AddressModel;

});