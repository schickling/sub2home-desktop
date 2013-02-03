// Filename: src/js/views/header/HeaderView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'notificationcenter',
	'models/stateModel',
	'views/header/CartView',
	'text!templates/header/HeaderTemplate.html'
	], function ($, _, Backbone, router, notificationcenter, stateModel, CartView, HeaderTemplate) {

	var HeaderView = Backbone.View.extend({

		el: $('#header'),

		template: _.template(HeaderTemplate),

		events: {
			'click .back': 'back',
			'click .logo': 'reset',
			'click .currentInfo': 'notifyTest'
		},

		initialize: function () {
			this.render();

			stateModel.on('change:storeModel', this.render, this);
		},

		render: function () {
			// TODO
			if (stateModel.get('storeModel')) {

				var json = {
					storeTitle: stateModel.get('storeModel').get('title')
				};

				this.$el.html(this.template(json));

				this.renderCart();

			}
		},

		renderCart: function () {

			if (stateModel.get('storeModel')) {
				var cartView = new CartView({
					el: this.$('.trayPreview')
				});
			}
		},

		back: function () {
			router.navigate('store', true);
		},

		reset: function () {
			window.localStorage.clear();
		},

		notifyTest: function () {
			notificationcenter.error('Test', 'Das ist ein test!' + Math.random());
		}

	});

	return HeaderView;

});