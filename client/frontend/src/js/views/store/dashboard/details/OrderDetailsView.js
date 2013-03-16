// Filename: src/js/views/store/dashboard/OrderDetailsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/dashboard/details/OrderedItemsView',
	'text!templates/store/dashboard/details/OrderDetailsTemplate.html'
	], function ($, _, Backbone, OrderedItemsView, OrderDetailsTemplate) {

	var OrderDetailsView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(OrderDetailsTemplate);

			new OrderedItemsView({
				el: this.$('.orderedItems'),
				collection: this.model.get('orderedItemsCollection')
			});
		}

	});

	return OrderDetailsView;

});