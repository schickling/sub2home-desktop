define([
    'underscore',
    'backbone',
    'global',
    'notificationcenter'
    ], function (_, Backbone, global, notificationcenter) {

	var DeliveryAreaModel = Backbone.Model.extend({

		defaults: {
			minimumValue: 0,
			minimumDuration: 0,
			district: '',
			city: '',
			postal: 0,

			isSelected: false
		},

		initialize: function () {

			// throw errors
			this.on('invalid', function (model, error) {
				notificationcenter.notify('models.deliveryAreaModel.invalid', {
					error: error
				});
			});

		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/deliveryareas';
		},

		validate: function (attributes) {


			var minimumValue = attributes.minimumValue;

			if (typeof (minimumValue) !== 'number' || minimumValue !== parseFloat(minimumValue)) {
				return "minimumValue has to be numeric";
			}

			if (minimumValue < 0) {
				return "minimumValue can't be negative";
			}


			var minimumDuration = attributes.minimumDuration;

			if (typeof (minimumDuration) !== 'number' || minimumDuration !== parseFloat(minimumDuration)) {
				return "minimumDuration has to be numeric";
			}

			if (minimumDuration < 0) {
				return "minimumDuration can't be negative";
			}


			var postal = attributes.postal;

			if (typeof (postal) !== 'number' || postal !== parseInt(postal, 10)) {
				return "postal has to be numeric";
			}

			if (postal < 10000 || postal > 99999) {
				return "no valid postal";
			}

		}

	});

	return DeliveryAreaModel;

});