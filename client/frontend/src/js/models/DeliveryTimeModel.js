define([
	'underscore',
	'backbone',
	'global'
	], function (_, Backbone, global) {

	var DeliveryTimeModel = Backbone.Model.extend({

		defaults: {
			dayOfWeek: 0,
			startMinutes: 0,
			endMinutes: 60
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/deliverytimes';
		},

		checkIfNow: function () {
			var date = new Date(),
				dayOfWeek = date.getDay(),
				currentMinutes = date.getMinutes() * 60 + date.getHours();

			if (dayOfWeek !== this.get('dayOfWeek') || currentMinutes < this.get('startMinutes') || currentMinutes > this.get('endMinutes')) {
				return false;
			} else {
				return true;
			}
		},

		validate: function (attributes) {


			var startMinutes = attributes.startMinutes;

			if (typeof(startMinutes) !== 'number' || startMinutes !== parseInt(startMinutes, 10)) {
				return "startMinutes has to be numeric";
			}

			if (startMinutes < 0) {
				return  "startMinutes can't be negative";
			}


			var endMinutes = attributes.endMinutes;

			if (typeof(endMinutes) !== 'number' || endMinutes !== parseInt(endMinutes, 10)) {
				return "endMinutes has to be numeric";
			}

			if (endMinutes < 0) {
				return  "endMinutes can't be negative";
			}


			if (endMinutes <= startMinutes) {
				return  "endMinutes must be less then startMinutes";
			}

		}

	});

	return DeliveryTimeModel;

});