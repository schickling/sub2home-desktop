// Filename: src/js/views/store/checkout/CountdownView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'models/stateModel',
    'models/cartModel',
    'text!templates/store/checkout/CountdownTemplate.html'
    ], function ($, _, Backbone, moment, stateModel, cartModel, CountdownTemplate) {

	"use strict";

	var CountdownView = Backbone.View.extend({

		template: _.template(CountdownTemplate),

		countdownTimer: null,

		initialize: function () {
			this._render();

			// keep due date in time
			this._initializeCountdownTimer();
		},

		_initializeCountdownTimer: function () {
			var self = this;
			this.countdownTimer = setInterval(function () {
				self._render();
			}, 60000);
		},

		_render: function () {

			var orderModel = cartModel.get('orderModel'),
				dueDate = orderModel.get('dueDate'),
				dueMoment = moment(dueDate),
				currentMoment = moment(),
				hours = dueMoment.diff(currentMoment, 'hours'),
				minutes = dueMoment.diff(currentMoment, 'minutes') % 60,
				storeModel = stateModel.get('storeModel'),
				storeAddressModel = storeModel.get('addressModel'),
				customerAddressModel = cartModel.getCustomerAddressModel();

			var json = {
				dueTime: dueMoment.format('HH:mm'),
				hours: this._padNumber(hours),
				minutes: this._padNumber(minutes),
				firstName: customerAddressModel.get('firstName'),
				street: customerAddressModel.get('street'),
				storePhone: storeAddressModel.get('phone')
			};

			this.$el.html(this.template(json));
		},

		_padNumber: function (number) {
			if (number < 10) {
				number = '0' + number;
			}

			return number;
		},

		destroy: function () {
			clearInterval(this.countdownTimer);
		}


	});

	return CountdownView;

});