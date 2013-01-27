// Filename: src/js/views/store/tray/OrderedItemsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/cartModel',
	'views/store/tray/OrderedItemView'
	], function ($, _, Backbone, cartModel, OrderedItemView) {

	var OrderedItemsView = Backbone.View.extend({

		initialize: function () {

			this.collection = cartModel.get('orderedItemsCollection');

			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (orderedItemModel) {
				this.renderOrderedItem(orderedItemModel);
			}, this);
		},

		renderOrderedItem: function (orderedItemModel) {
			var orderedItemView = new OrderedItemView({
				model: orderedItemModel
			});

			this.$el.append(orderedItemView.$el);
		}

	});

	return OrderedItemsView;

});