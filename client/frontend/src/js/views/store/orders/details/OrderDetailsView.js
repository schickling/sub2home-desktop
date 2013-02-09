// Filename: src/js/views/store/orders/OrderDetailsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/orders/details/OrderedItemsView',
	'text!templates/store/orders/OrderDetailsTemplate.html'
	], function ($, _, Backbone, OrderedItemsView, OrderDetailsTemplate) {

	var OrderDetailsView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(OrderDetailsTemplate);

			new OrderedItemsView({
				el: this.$('.orderContent'),
				collection: this.model.get('orderedItemsCollection')
			});
		}

	});

	return OrderDetailsView;

});