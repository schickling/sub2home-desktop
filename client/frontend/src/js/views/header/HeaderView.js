// Filename: src/js/views/header/HeaderView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'views/header/CartView',
	'text!templates/header/HeaderTemplate.html'
	], function ($, _, Backbone, router, stateModel, CartView, HeaderTemplate) {

	var HeaderView = Backbone.View.extend({

		className: 'header',

		template: _.template(HeaderTemplate),

		events: {
			'click .back': 'back',
			'click .logo': 'reset'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			// TODO
			if (stateModel.get('storeModel')) {

				var json = {
					storeTitle: stateModel.get('storeModel').get('title')
				};

				this.$el.html(this.template(json));

				this.renderCart();

				this.$el.appendTo($('body'));

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
		}

	});

	return HeaderView;

});