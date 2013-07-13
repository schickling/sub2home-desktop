// Filename: src/js/views/store/tray/OrderedItemsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/cartModel',
    'views/store/tray/OrderedItemView'
    ], function ($, _, Backbone, cartModel, OrderedItemView) {

	"use strict";

	var OrderedItemsView = Backbone.View.extend({

		initialize: function () {

			this.collection = cartModel.getOrderedItemsCollection();

			this._render();

		},

		_render: function () {
			_.each(this.collection.models, function (orderedItemModel) {
				this._renderOrderedItem(orderedItemModel);
			}, this);
		},

		_renderOrderedItem: function (orderedItemModel) {
			var orderedItemView = new OrderedItemView({
				model: orderedItemModel
			});

			this.$el.append(orderedItemView.$el);
		}

	});

	return OrderedItemsView;

});