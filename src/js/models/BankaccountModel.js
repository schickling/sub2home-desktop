// Filename: src/js/models/BankaccountModel.js
define([
	'underscore',
	'backbone',
	'notificationcenter'
	], function (_, Backbone, notificationcenter) {

	var BankaccountModel = Backbone.Model.extend({

		defaults: {
			name: '',
			bic: '',
			iban: ''
		},

		initialize: function () {
			// throw errors
			this.on('invalid', function (model, error) {
				notificationcenter.notify('models.bankaccountModel.invalid', {
					error: error
				});
			});
		},

		urlRoot: function () {
			return 'bankaccounts';
		},

		validate: function (attributes) {

			if (attributes.name === '') {
				return 'name';
			}

			if (attributes.bic === '') {
				return 'bic';
			}

			if (attributes.iban === '') {
				return 'iban';
			}

		}

	});

	return BankaccountModel;

});