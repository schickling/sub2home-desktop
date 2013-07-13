// Filename: src/js/views/header/HeaderView.js
define([
    'jquery',
    'jqueryEasing',
    'underscore',
    'backbone',
    'router',
    'models/authentificationModel',
    'models/stateModel',
    'views/header/StoreView',
    'text!templates/header/HeaderTemplate.html',
    'text!templates/header/RoleSwitchTemplate.html'
    ], function ($, jqueryEasing, _, Backbone, router, authentificationModel, stateModel, StoreView, HeaderTemplate, RoleSwitchTemplate) {

	"use strict";

	var HeaderView = Backbone.View.extend({

		el: $('#header'),

		events: {
			'click #logo': '_goToHomeHome',
			'click #roleSwitch': '_switchContentView',
			'click #toTheInfo': '_goToInfo'
		},

		initialize: function () {
			this._render();

			this._listenToHeaderState();

			stateModel.on('change:storeModel', this._renderStoreView, this);

			authentificationModel.on('change:isLoggedIn', this._render, this);

		},

		_render: function () {

			this.$el.html(HeaderTemplate);

			var isLoggedIn = authentificationModel.isLoggedIn(),
				isStoreSelected = stateModel.get('storeModel') !== null,
				isClientHeaderActive = stateModel.get('isClientHeaderActive');

			if (isLoggedIn) {
				this._renderRoleSwitch();
				this._renderClientView();
			}

			if (isStoreSelected) {
				this._renderStoreView();
			}

			if (isLoggedIn && isClientHeaderActive) {
				this._showClientView();
				this.$('#headerCustomerContent').hide();
			} else if (isStoreSelected) {
				this._showStoreView();
				this.$('#headerClientContent').hide();
			}

		},

		_listenToHeaderState: function () {
			stateModel.on('change:isClientHeaderActive', function () {
				if (stateModel.get('isClientHeaderActive')) {
					this._showClientView();
				} else {
					this._showStoreView();
				}
			}, this);
		},

		_renderRoleSwitch: function () {
			this.$el.append(RoleSwitchTemplate);

			this.$el.addClass('isLoggedIn');
		},

		_renderStoreView: function () {
			new StoreView({
				model: stateModel.get('storeModel'),
				el: this.$('#headerCustomerContent')
			});
		},

		_renderClientView: function () {

			// require view when its needed
			var self = this;
			require(['views/header/ClientView'], function (ClientView) {

				new ClientView({
					el: self.$('#headerClientContent')
				});

			});

		},

		_showClientView: function () {
			var $handle = this.$('#handle'),
				$headerCustomerContent = this.$('#headerCustomerContent'),
				$headerClientContent = this.$('#headerClientContent');

			$headerCustomerContent.fadeOut(100);
			$headerClientContent.fadeIn(150);

			// role switch
			$handle.animate({
				top: 27
			}, 100, 'easeInExpo', function () {
				$handle.removeClass('iUser').addClass('iSettings');
			});
		},

		_showStoreView: function () {
			var $handle = this.$('#handle'),
				$headerCustomerContent = this.$('#headerCustomerContent'),
				$headerClientContent = this.$('#headerClientContent');

			$headerClientContent.fadeOut(100);
			$headerCustomerContent.fadeIn(150);

			// role switch
			$handle.animate({
				top: 2
			}, 100, 'easeInExpo', function () {
				$handle.removeClass('iSettings').addClass('iUser');
			});
		},

		_goToHomeHome: function () {
			router.navigate('/', true);
		},

		_switchContentView: function () {
			if (stateModel.get('isClientHeaderActive')) { // switch to store header
				stateModel.set('isClientHeaderActive', false);
				if (stateModel.currentRouteIsClientRelated()) {
					if (stateModel.currentRouteIsStoreRelated()) {
						router.navigate('store', true);
					} else {
						router.navigate('/', true);
					}
				}
			} else {
				stateModel.set('isClientHeaderActive', true); // switch to client header
				if (!stateModel.currentRouteIsClientRelated()) {
					if (stateModel.currentRouteIsStoreRelated()) {
						router.navigate('store/dashboard', true);
					} else {
						router.navigate('dashboard', true);
					}
				}
			}
		},

		_goToInfo: function() {
			if (stateModel.currentRouteIsStoreRelated()) {
				router.navigate('store/info', true);
			} else {
				router.navigate('info', true);
			}
		}

	});

	return HeaderView;

});