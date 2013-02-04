// Filename: src/js/views/store/orders/OrderView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/orders/OrderTemplate.html'
	], function ($, _, Backbone, OrderTemplate) {

	var OrderView = Backbone.View.extend({

		template: _.template(OrderTemplate),

		className: 'order',

		initialize: function () {
			this.render();
		},

		render: function () {
			var orderModel = this.model,
				addressModel = orderModel.get('addressModel');

			var json = {
				id: orderModel.get('id'),
				total: orderModel.get('total'),
				postal: addressModel.get('postal'),
				city: addressModel.get('city')
			};

			this.$el.html(this.template(json));
		}

	});

	return OrderView;

});