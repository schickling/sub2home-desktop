define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'models/DeliveryAreaModel',
    'views/store/config/DeliveryAreaView'
    ], function ($, _, Backbone, notificationcenter, DeliveryAreaModel, DeliveryAreaView) {

	"use strict";

	var DeliveryAreasView = Backbone.View.extend({

		events: {
			'click .bAdd': '_addDeliveryArea'
		},

		// cached dom
		$configContent: null,

		initialize: function () {
			this._cacheDom();
			this._render();
		},

		_cacheDom: function () {
			this.$configContent = this.$('.configContent');
		},

		_render: function () {
			_.each(this.collection.models, function (item) {
				this._renderDeliveryArea(item);
			}, this);
		},

		_renderDeliveryArea: function (item) {
			var deliveryAreaView = new DeliveryAreaView({
				model: item
			});

			this.$configContent.append(deliveryAreaView.el);
		},

		_addDeliveryArea: function () {

			var self = this;

			this.collection.create({}, {
				validate: false,
				success: function (deliveryAreaModel) {
					notificationcenter.notify('views.store.config.deliveryArea.add.success');
					self._renderDeliveryArea(deliveryAreaModel);
				},
				error: function () {
					notificationcenter.notify('views.store.config.deliveryArea.add.error');
				}
			});

		}

	});

	return DeliveryAreasView;

});