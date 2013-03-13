// Filename: src/js/views/store/tray/DeliveryTimeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'notificationcenter',
    'models/cartModel',
    'text!templates/store/tray/DeliveryTimeTemplate.html'
    ], function ($, _, Backbone, moment, notificationcenter, cartModel, DeliveryTimeTemplate) {

	var DeliveryTimeView = Backbone.View.extend({

		template: _.template(DeliveryTimeTemplate),

		events: {
			'click #hours .iArrowUp.active': '_addHour',
			'click #hours .iArrowDown.active': '_substractHour',
			'click #minutes .iArrowUp.active': '_addMinute',
			'click #minutes .iArrowDown.active': '_substractMinute'
		},

		intervalTimer: null,

		initialize: function () {
			this._render();

			// keep due date in time
			this._initializeIntervalTimer();

			this._listenForDestory();
		},

		_render: function () {

			var dueDate = cartModel.getValidDueDate(),
				dueMoment = moment(dueDate),
				spareMinutes = cartModel.getSpareMinutes(),
				json = {
					hoursAreMinimum: spareMinutes < 60,
					minutesAreMinimum: spareMinutes < 1,
					dueHours: dueMoment.format('HH'),
					dueMinutes: dueMoment.format('mm'),
					minimumDuration: cartModel.getMinimumDuration()
				};

			this.$el.html(this.template(json));
		},

		_initializeIntervalTimer: function () {
			var self = this;
			this.intervalTimer = setInterval(function () {
				var spareMinutes = cartModel.getSpareMinutes();

				if (spareMinutes === 0) {
					self._addMinute();
				}

			}, 60000);
		},

		_addHour: function () {
			this._addMinutesToDueDate(60);
		},

		_substractHour: function () {
			this._addMinutesToDueDate(-60);
		},

		_addMinute: function () {
			this._addMinutesToDueDate(1);
		},

		_substractMinute: function () {
			this._addMinutesToDueDate(-1);
		},

		_addMinutesToDueDate: function (minutes) {
			var currentDueDate = cartModel.getValidDueDate(),
				newDueDate = new Date(currentDueDate.getTime() + minutes * 60000),
				spareMinutes = cartModel.getSpareMinutes();

			if (spareMinutes + minutes >= 0) {
				cartModel.setDueDate(newDueDate);
			} else {
				notificationcenter.notify('views.store.tray.invalidDueTime');
			}

			this._render();
		},

		_listenForDestory: function () {
			this.once('destroy', function () {
				clearInterval(this.intervalTimer);
			}, this);
		}

	});

	return DeliveryTimeView;

});