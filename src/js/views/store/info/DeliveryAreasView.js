// Filename: src/js/views/store/info/DeliveryAreasView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/info/DeliveryAreaView',
    ], function ($, _, Backbone, DeliveryAreaView) {

	"use strict";

	var DeliveryAreasView = Backbone.View.extend({

		$firstColumn: null,
		$secondColumn: null,

		initialize: function () {
			this._cacheDom();
			this._render();
		},

		_cacheDom: function () {
			this.$firstColumn = this.$('.fluidColumn').first();
			this.$secondColumn = this.$('.fluidColumn').last();
		},

		_render: function () {
			var collectionSize = this.collection.length,
				lastPostal;

			_.each(this.collection.models, function (deliveryAreaModel, index) {
				this._renderDeliveryArea(deliveryAreaModel, index / collectionSize <= 0.5, deliveryAreaModel.get('postal') == lastPostal);
				lastPostal = deliveryAreaModel.get('postal');
			}, this);
		},

		_renderDeliveryArea: function (deliveryAreaModel, placeInFirstCollumn, hidePostal) {
			var deliveryAreaView = new DeliveryAreaView({
				model: deliveryAreaModel
			});

			if (placeInFirstCollumn) {
				this.$firstColumn.append(deliveryAreaView.el);
			} else {
				this.$secondColumn.append(deliveryAreaView.el);
			}

			deliveryAreaView.$el.toggleClass('hidePostal', hidePostal);
		}

	});

	return DeliveryAreasView;

});