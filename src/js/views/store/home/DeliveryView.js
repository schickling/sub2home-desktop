// Filename: src/js/views/store/config/DeliveryView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'models/stateModel',
    'text!templates/store/home/DeliveryTemplate.html'
    ], function ($, _, Backbone, moment, stateModel, DeliveryTemplate) {

	"use strict";

	var DeliveryView = Backbone.View.extend({

		template: _.template(DeliveryTemplate),

		initialize: function () {
			this._render();
			this._listenToStoreModel();
		},

		_render: function () {
			var storeModel = stateModel.get('storeModel'),
				selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel(),
				area = selectedDeliveryAreaModel.get('district') || selectedDeliveryAreaModel.get('city'),
				isDelivering = storeModel.isDelivering(),
				nextDeliveryTime = '';

			if (!isDelivering) {
				var nextDeliveryTimeModel = storeModel.getNextDeliveryTimeModel(),
					now = new Date(),
					currentDayOfWeek = now.getDay(),
					nextDayOfWeek = nextDeliveryTimeModel.get('dayOfWeek');

				if (currentDayOfWeek !== nextDayOfWeek) {
					nextDeliveryTime += this._getWeekDay(nextDayOfWeek) + ' - ' + nextDeliveryTimeModel.getStartTime();
					this._fixWidthOtherDay(area, nextDeliveryTime);
				} else {
					this._fixWidthToday(area, nextDeliveryTime);
					nextDeliveryTime += nextDeliveryTimeModel.getStartTime();
				}

			}

			var json = {
				area: area,
				postal: selectedDeliveryAreaModel.get('postal'),
				minimumDuration: selectedDeliveryAreaModel.get('minimumDuration'),
				isDelivering: storeModel.isDelivering(),
				nextDeliveryTime: nextDeliveryTime,
			};

			this.$el.html(this.template(json));
		},

		_listenToStoreModel: function () {
			var storeModel = stateModel.get('storeModel');
			this.listenTo(storeModel, 'change', this._render);
		},

		_getWeekDay: function (dayOfWeek) {
			var weekdays = {
				0: 'Sonntag',
				1: 'Montag',
				2: 'Dienstag',
				3: 'Mittwoch',
				4: 'Donnerstag',
				5: 'Freitag',
				6: 'Samstag'
			};

			return weekdays[dayOfWeek];
		},

		_fixWidthToday: function (area, nextDeliveryTime) {
			var tooLong = area.length + nextDeliveryTime.length > 9;

			this.$el.toggleClass('shrink', tooLong);
		},

		_fixWidthOtherDay: function (area, nextDeliveryTime) {
			var tooLong = area.length + nextDeliveryTime.length > 21;

			this.$el.toggleClass('shrink', tooLong);
		}

	});

	return DeliveryView;

});