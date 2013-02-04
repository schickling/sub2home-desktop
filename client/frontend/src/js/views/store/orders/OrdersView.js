// Filename: src/js/views/store/orders/OrdersView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/OrdersCollection',
	'views/store/orders/OrderView'
	], function ($, _, Backbone, OrdersCollection, OrderView) {

	var OrdersView = Backbone.View.extend({

		$ordersToday: null,

		$olderOrders: null,

		page: 0,

		initialize: function () {
			var self = this;

			this.collection = new OrdersCollection();

			this.collection.fetch({

				parse: true,

				data: $.param({
					page: this.page++
				}),

				success: function () {
					self.render();
				}

			});

		},

		render: function () {
			// cache order container
			this.$ordersToday = this.$('.ordersToday');
			this.$olderOrders = this.$('.olderOrders');

			_.each(this.collection.models, function (orderModel) {
				this.renderOrder(orderModel);
			}, this);
		},

		renderOrder: function (orderModel) {
			var orderView = new OrderView({
				model: orderModel
			});

			if (orderModel.isToday()) {
				this.$ordersToday.append(orderView.el);
			} else {
				this.$olderOrders.append(orderView.el);
			}

		}



	});

	return OrdersView;

});