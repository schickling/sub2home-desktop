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
			'click #back': '_back'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {

			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));
			this._renderCart();

		},

		_renderCart: function () {

			var cartView = new CartView({
				el: this.$('#trayPreview')
			});

		},

		_back: function () {
			router.navigate('store', true);
		}

	});

	return StoreView;

});