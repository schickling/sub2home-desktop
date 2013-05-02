define([
    'underscore',
    'backbone',
    'notificationcenter'
    ], function (_, Backbone, notificationcenter) {

	var AddressModel = Backbone.Model.extend({

		defaults: {
			firstName: '',
			lastName: '',
			street: '',
			streetNumber: '',
			streetAdditional: '',
			city: '',
			district: '',
			phone: '',
			email: '',
			postal: 0
		},

		urlRoot: 'addresses',

		initialize: function () {
			// throw errors
			this.on('invalid', function (model, error) {
				notificationcenter.notify('models.addressModel.invalid', {
					error: error
				});
			});
		},

		parse: function (response) {

			if (response) {

				if (response.hasOwnProperty('phone')) {

					var phone = response.phone,
						firstDigit = parseInt(String(phone).charAt(0), 10);

					if (firstDigit > 0 && firstDigit <= 9) {
						response.phone = '0' + phone;
					}

				}

				return response;

			}
			
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

			console.log(attributes.phone);
			if (!this._validatePhone(attributes.phone)) {
				return 'phone';
			}

			if (!this._validateEmail(attributes.email)) {
				return 'email';
			}
		},

		_validateEmail: function (email) {
			var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return re.test(email);
		},

		_validatePhone: function (phone) {
			var re = /^0(\d){2,}(\s|-|\/)?(\s|\d){3,}$/;
			return re.test(phone);
		}

	});

	return AddressModel;

});