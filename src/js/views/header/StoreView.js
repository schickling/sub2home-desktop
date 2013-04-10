// Filename: src/js/views/header/StoreView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'notificationcenter',
    'models/stateModel',
    'views/header/CartView',
    'text!templates/header/StoreTemplate.html'
    ], function ($, _, Backbone, router, notificationcenter, stateModel, CartView, StoreTemplate) {

	var StoreView = Backbone.View.extend({

		template: _.template(StoreTemplate),

		events: {
			'click #back': '_backToStoreHome'
		},

		// cached dom
		$back: null,

		initialize: function () {
			this._render();
			this._listenToCurrentRoute();
		},

		_render: function () {

			var json = {
				title: this.model.get('title'),
				isBackButtonHidden: this._currentRouteIsStoreHome()
			};

			this.$el.html(this.template(json));
			this._cacheDom();
			this._renderCart();

		},

		_cacheDom: function() {
			this.$back = this.$('#back');
		},

		_renderCart: function () {

			var cartView = new CartView({
				el: this.$('#trayPreview')
			});

		},

		_listenToCurrentRoute: function() {
			this.listenTo(stateModel, 'change:currentRoute', this._checkBackButton);
		},

		_currentRouteIsStoreHome: function() {
			var currentRoute = stateModel.get('currentRoute');

			return currentRoute === 'store.home';
		},

		_checkBackButton: function() {

			if (this._currentRouteIsStoreHome()) {
				this._hideBackButton();
			} else {
				this._showBackButton();
			}
		},

		_hideBackButton: function() {
			this.$back.fadeOut(300);
		},

		_showBackButton: function() {
			this.$back.fadeIn(300);
		},

		_backToStoreHome: function () {
			router.navigate('store', true);
		}

	});

	return StoreView;

});