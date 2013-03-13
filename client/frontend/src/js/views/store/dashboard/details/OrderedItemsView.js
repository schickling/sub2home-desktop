// Filename: src/js/views/store/dashboard/details/OrderedItemsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/dashboard/details/OrderedItemView'
	], function ($, _, Backbone, OrderedItemView) {

	var OrderedItemsView = Backbone.View.extend({

		initialize: function () {
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

			this.$el.append(orderedItemView.el);
		}

	});

	return OrderedItemsView;

});