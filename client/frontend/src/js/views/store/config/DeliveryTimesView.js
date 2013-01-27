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
			var self = this;

			this.collection = new DeliveryTimesCollection();
			this.collection.fetch({
				success: function() {
					self.render();
				}
			});
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.renderDeliveryTime(item);
			}, this);
		},

		renderDeliveryTime: function (item) {
			var deliveryTimeView = new DeliveryTimeView({
				model: item
			});

			this.$('.unfolded').append(deliveryTimeView.el);
		},

		addDeliveryTime: function () {
			var deliveryTimeModel = new DeliveryTimeModel();

			var self = this;

			deliveryTimeModel.save({}, {
				success: function() {
					self.renderDeliveryTime(deliveryTimeModel);
					self.collection.add(deliveryTimeModel);
				}
			});
		},

		toggleView: function () {
			var $unfolded = this.$el.find('.unfolded');

			$unfolded.slideToggle();
		}
	});

	return DeliveryTimesView;

});