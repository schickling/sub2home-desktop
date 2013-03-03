define([
	'jquery',
	'underscore',
	'backbone',
	'notificationcenter',
	'models/DeliveryAreaModel',
	'collections/DeliveryAreasCollection',
	'views/store/config/DeliveryAreaView'
	], function ($, _, Backbone, notificationcenter, DeliveryAreaModel, DeliveryAreasCollection, DeliveryAreaView) {

	var DeliveryAreasView = Backbone.View.extend({

		events: {
			'click .sBAdd': '_addDeliveryArea'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (item) {
				this._renderDeliveryArea(item);
			}, this);
		},

		_renderDeliveryArea: function (item) {
			var deliveryAreaView = new DeliveryAreaView({
				model: item,
				parentView: this
			});

			this.$('.unfolded').append(deliveryAreaView.el);
		},

		_addDeliveryArea: function () {
			var deliveryAreaModel = new DeliveryAreaModel();

			var self = this;

			deliveryAreaModel.save({}, {
				validate: false,
				success: function () {
					self._renderDeliveryArea(deliveryAreaModel);
					self.collection.add(deliveryAreaModel);
				},
				error: function () {
					notificationcenter.error('damn it', '.');
				}
			});
		}

	});

	return DeliveryAreasView;

});