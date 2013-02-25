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

			if (attributes.name === '') {
				return 'name';
			}

			if (attributes.bankName === '') {
				return 'bankName';
			}

			if (attributes.bankCodeNumber < 0) {
				return 'bankCodeNumber';
			}

			if (attributes.accountNumber < 0) {
				return 'accountNumber';
			}

		}

	});

	return BankaccountModel;

});