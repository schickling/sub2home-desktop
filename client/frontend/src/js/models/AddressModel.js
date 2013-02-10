define([
	'underscore',
	'backbone',
	'notificationcenter',
	'global'
	], function (_, Backbone, notificationcenter, global) {

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

		initialize: function () {
			// throw errors
			this.on('invalid', function (model, error) {
				notificationcenter.error('Addressdaten fehlerhaft', error);
			});
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/addresses';
		},

		validate: function (attributes) {

			if (attributes.firstName === '') {
				return 'firstName';
			}

			if (attributes.lastName === '') {
				return 'lastName';
			}

			if (attributes.street === '') {
				return 'street';
			}

			if (attributes.postal < 10000 || attributes.postal > 99999) {
				return 'postal';
			}

			if (attributes.city === '') {
				return 'city';
			}

			if (attributes.phone === '') {
				return 'phone';
			}

			if (attributes.email === '' || !this.validateEmail(attributes.email)) {
				return 'email';
			}
		},

		validateEmail: function (email) {
			var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return re.test(email);
		}

	});

	return AddressModel;

});