// Filename: src/js/views/store/assortment/ItemsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/assortment/ItemView'
	], function ($, _, Backbone, ItemView) {

	var ItemsView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (itemModel) {
				this._renderItem(itemModel);
			}, this);
		},

		_renderItem: function (itemModel) {
			var itemView = new ItemView({
				model: itemModel
			});

			this.$el.append(itemView.el);
		}

	});

	return ItemsView;

});