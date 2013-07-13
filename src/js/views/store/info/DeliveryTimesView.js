// Filename: src/js/views/store/info/DeliveryTimesView.js
define([
    'jquery',
    'underscore',
    'backbone'
    ], function ($, _, Backbone) {

	"use strict";

	var DeliveryTimesView = Backbone.View.extend({

		initialize: function () {
			this._render();
			this._markClosedDeliveryTimes();
		},

		_render: function () {
			_.each(this.collection.models, function (deliveryTimeModel) {
				this._renderDeliveryTime(deliveryTimeModel);
			}, this);
		},

		_renderDeliveryTime: function (deliveryTimeModel) {
			var $weekday = this.$('.weekday[data-day="' + deliveryTimeModel.get('dayOfWeek') + '"]'),
				$openingHours = $weekday.find('.openingHours'),
				startTime = deliveryTimeModel.getStartTime(),
				endTime = deliveryTimeModel.getEndTime();


			var $deliveryTime = $('<div>', {
				text: startTime + ' - ' + endTime
			});

			$openingHours.append($deliveryTime);

		},

		_markClosedDeliveryTimes: function () {
			var $weekdays = this.$('.weekday'),
				$closed = $('<div>Geschlossen</div>'),
				$openingHours;

			$weekdays.each(function () {
				$openingHours = $(this).find('.openingHours');

				if ($openingHours.is(':empty')) {
					$openingHours.append($closed.clone());
				}
			});
		}

	});

	return DeliveryTimesView;

});