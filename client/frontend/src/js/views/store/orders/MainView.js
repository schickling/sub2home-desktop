// Filename: src/js/views/store/orders/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'views/store/orders/OrdersView',
	'views/store/orders/RevenuesView',
	'text!templates/store/orders/MainTemplate.html'
	], function ($, _, Backbone, PageView, OrdersView, RevenuesView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {
			this.render();
		},

		render: function () {

			this.$el.html(MainTemplate);

			this.renderOrders();
			
			this.renderRevenues();

			this.append();

		},

		renderOrders: function () {
			new OrdersView({
				el: this.$('.content')
			});
		},

		renderRevenues: function() {
			new RevenuesView({
				el: this.$('.revenues')
			});
		}

	});

	return MainView;

});