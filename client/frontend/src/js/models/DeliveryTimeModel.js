define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var DeliveryTimeModel = Backbone.Model.extend({

		defaults: {
			dayOfWeek: 0,
			startMinutes: 0,
			endMinutes: 0
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + window.localStorage.getItem('storeAlias') + '/deliverytimes';
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
		}
	});

	return DeliveryTimeModel;

});