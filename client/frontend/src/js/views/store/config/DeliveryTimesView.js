define([
	'jquery',
	'underscore',
	'backbone',
	'models/DeliveryTimeModel',
	'collections/DeliveryTimesCollection',
	'views/store/config/DeliveryTimeView'
	], function($, _, Backbone, DeliveryTimeModel, DeliveryTimesCollection, DeliveryTimeView) {

	var DeliveryTimesView = Backbone.View.extend({
		events: {
			'click .buttonAdd': 'addDeliveryTime',
			'click .folded': 'toggleView'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (deliveryTimeModel) {
				this.renderDeliveryTime(deliveryTimeModel);
			}, this);
		},

		renderDeliveryTime: function (deliveryTimeModel) {
			var deliveryTimeView = new DeliveryTimeView({
				model: deliveryTimeModel
			});

			var $matchingBusinessDay = this.$('.businessDay[data-day="' + deliveryTimeModel.get('dayOfWeek') + '"]'),
				$openingHours = $matchingBusinessDay.find('.openingHours');

			$openingHours.append(deliveryTimeView.el);
		},

		addDeliveryTime: function (e) {
			var dayOfWeek = $(e.target).parents('.businessDay').first().attr('data-day'),
				self = this;

				console.log('jo');

			var deliveryTimeModel = new DeliveryTimeModel({
				dayOfWeek: dayOfWeek
			});

			deliveryTimeModel.save({}, {
				success: function() {
					self.renderDeliveryTime(deliveryTimeModel);
					self.collection.add(deliveryTimeModel);
				}
			});
		},

		toggleView: function () {
			var $unfolded = this.$('.unfolded');

			$unfolded.slideToggle();
		}
	});

	return DeliveryTimesView;

});