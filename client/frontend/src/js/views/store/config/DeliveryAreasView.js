define([
	'jquery',
	'underscore',
	'backbone',
	'models/DeliveryAreaModel',
	'collections/DeliveryAreasCollection',
	'views/store/config/DeliveryAreaView'
	], function($, _, Backbone, DeliveryAreaModel, DeliveryAreasCollection, DeliveryAreaView) {

	var DeliveryAreasView = Backbone.View.extend({
		events: {
			'click .button_add': 'addDeliveryArea',
			'click .folded': 'toggle_view'
		},

		initialize: function () {
			var self = this;

			this.collection = new DeliveryAreasCollection();
			this.collection.fetch({
				success: function() {
					self.render();
				}
			});
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.renderDeliveryArea(item);
			}, this);
		},

		renderDeliveryArea: function (item) {
			var deliveryAreaView = new DeliveryAreaView({
				model: item
			});

			this.$('.unfolded').append(deliveryAreaView.el);
		},

		addDeliveryArea: function () {
			var deliveryAreaModel = new DeliveryAreaModel();

			var self = this;

			deliveryAreaModel.save({}, {
				success: function() {
					self.renderDeliveryArea(deliveryAreaModel);
					self.collection.add(deliveryAreaModel);
				}
			});
		},

		toggle_view: function () {
			var $unfolded = this.$el.find('.unfolded');

			$unfolded.slideToggle();
		}
	});

	return DeliveryAreasView;

});