// Filename: src/js/views/header/CartView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'models/cartModel',
	'text!templates/header/CartTemplate.html'
	], function ($, _, Backbone, router, stateModel, cartModel, CartTemplate) {

	var CartView = Backbone.View.extend({

		template: _.template(CartTemplate),

		events: {
			'click': 'goToTray'
		},

		initialize: function () {
			this.model = cartModel;

			this.render();

			this.model.on('change', this.render, this);
		},

		render: function () {

			this.$el.html(this.template(this.model.toJSON()));

			this.$el.toggleClass('filled', (this.model.get('amount') > 0));
		},

		goToTray: function () {
			router.navigate('store/tablett', true);
		}

	});

	return CartView;

});