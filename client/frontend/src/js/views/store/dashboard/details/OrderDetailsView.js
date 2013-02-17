// Filename: src/js/views/store/dashboard/OrderDetailsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/dashboard/details/OrderedItemsView',
	'text!templates/store/dashboard/OrderDetailsTemplate.html'
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