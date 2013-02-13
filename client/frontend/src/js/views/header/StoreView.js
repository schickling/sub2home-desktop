// Filename: src/js/views/header/StoreView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'notificationcenter',
	'views/header/CartView',
	'text!templates/header/StoreTemplate.html'
	], function ($, _, Backbone, router, notificationcenter, CartView, StoreTemplate) {

	var StoreView = Backbone.View.extend({

		template: _.template(StoreTemplate),

		events: {
			'click .back': 'back',
			'click .currentInfo': 'notifyTest'
		},

		initialize: function () {
			this.render();
		},

		render: function () {

			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));

			this.renderCart();
		},

		renderCart: function () {

			var cartView = new CartView({
				el: this.$('.trayPreview')
			});

		},

		back: function () {
			router.navigate('store', true);
		},

		notifyTest: function () {
			notificationcenter.error('Test', 'Das ist ein test!' + Math.random());
		}

	});

	return StoreView;

});