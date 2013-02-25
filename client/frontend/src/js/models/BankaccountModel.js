// Filename: src/js/models/BankaccountModel.js
define([
	'underscore',
	'backbone',
	'notificationcenter'
	], function (_, Backbone, notificationcenter) {

	var BankaccountModel = Backbone.Model.extend({

		defaults: {
			name: '',
			bankName: '',
			bankCodeNumber: 0,
			accountNumber: 0
		},

		initialize: function () {
			// throw errors
			this.on('invalid', function (model, error) {
				notificationcenter.error('Kontodaten fehlerhaft', error);
			});
		},

		urlRoot: function () {
			return '/api/frontend/bankaccounts';
		},

		validate: function (attributes) {
			
		}

	});

	return BankaccountModel;

});