// Filename: src/js/views/store/orders/OrderDetailsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/orders/OrderDetailsTemplate.html'
	], function ($, _, Backbone, OrderDetailsTemplate) {

	var OrderDetailsView = Backbone.View.extend({

		template: _.template(OrderDetailsTemplate),

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template());
		}

	});

	return OrderDetailsView;

});