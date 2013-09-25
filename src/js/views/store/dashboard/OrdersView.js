// Filename: src/js/views/store/dashboard/OrdersView.js
define([
    'jquery',
    'jqueryRotate',
    'underscore',
    'backbone',
    'services/notificationcenter',
    'collections/OrdersCollection',
    'views/store/dashboard/OrderView',
    'views/store/dashboard/CreditView',
    'text!templates/store/dashboard/NoOrdersTemplate.html'
    ], function ($, jqueryRotate, _, Backbone, notificationcenter, OrdersCollection, OrderView, CreditView, NoOrdersTemplate) {

	"use strict";

	var OrdersView = Backbone.View.extend({

		$orderListing: null,
		$ordersToday: null,
		$olderOrders: null,
		$search: null,
		$refresh: null,
		$loadMore: null,
		$noOrders: null,

		// pagination counter
		pageOffset: 0,

		// search value for fetching
		search: '',

		autoRefreshInterval: null,
		rotateInterval: null,
		rotationDeg: 0,

		searchTimeout: null,

		isReady: true,

		// needed to indicate when to load noOrders view
		hasOrders: false,

		creditView: null,

		events: {
			'keyup #search': '_delayedSearch',
			'click #refresh': '_refresh',
			'click #loadMore': '_loadMore',
			'click #bMail': '_sendTestOrder',
			'mousemove': '_resetAutoRefresh',
			'click #checkAllOrders': '_checkAllOrders'
		},

		initialize: function () {

			this._createCreditView();

			this.collection = new OrdersCollection();

			this._cacheDom();
			this._fetchCollectionAndRender(true);
			this._startAutoRefresh();

		},

		_createCreditView: function () {
			this.creditView = new CreditView({
				el: this.$('#balanceOrder')
			});
		},

		_cacheDom: function () {
			this.$orderListing = this.$('#orderListing');
			this.$ordersToday = this.$('#ordersToday');
			this.$olderOrders = this.$('#olderOrders');
			this.$search = this.$('#search');
			this.$refresh = this.$('#refresh');
			this.$loadMore = this.$('#loadMore');
			this.$noOrders = this.$('#noOrders');
		},

		_listenToCollection: function () {
			this.listenTo(this.collection, 'add remove', this._render);
		},

		_startAutoRefresh: function () {

			var self = this;

			this.autoRefreshInterval = setInterval(function () {
				self._fetchCollectionAndRender(true);
			}, 20000);

		},

		_resetAutoRefresh: function () {

			clearInterval(this.autoRefreshInterval);
			this._startAutoRefresh();

		},

		_fetchCollectionAndRender: function (viewShouldBeResetted) {

			var self = this;

			if (this.isReady) {

				this.isReady = false;

				this._startRotateRefresh();

				// reset page offset
				if (viewShouldBeResetted) {
					this.pageOffset = 0;
				}

				this.collection.fetch({

					parse: true,

					data: $.param({
						search: this.search,
						page: this.pageOffset
					}),

					success: function (collection, receivedOrders) {
						self._stopRotateRefresh();

						if (viewShouldBeResetted) {
							self._resetView();
						}

						self._renderOrders();

						if (receivedOrders.length === 0 || self.search) {
							self._hideLoadMore();
						} else {
							self._showLoadMore();
						}

						if (collection.length === 0 && !self.hasOrders) {
							self._showNoOrders();
						} else {
							self.hasOrders = true;
							self._showOrders();
						}

						self.isReady = true;

					},

					error: function () {
						self._stopRotateRefresh();
						self._renderNoOrders();
					}

				});

			}

		},

		_showOrders: function () {
			this.$orderListing.show();
			this.$noOrders.hide();
		},

		_showNoOrders: function () {
			this.$orderListing.hide();

			// lazy load noOrders
			if (this.$noOrders.is(':empty')) {
				this._renderNoOrders();
			}

			this.$noOrders.show();
		},

		_renderOrders: function () {
			_.each(this.collection.models, function (orderModel) {
				this._renderOrder(orderModel);
			}, this);
		},

		_renderOrder: function (orderModel) {

			var orderView = new OrderView({
				model: orderModel,
				creditView: this.creditView
			});

			if (orderModel.wasCreatedToday()) {
				this.$ordersToday.append(orderView.el);
			} else {
				this.$olderOrders.append(orderView.el);
			}

		},

		_renderNoOrders: function () {
			this.$noOrders.html(NoOrdersTemplate);
		},

		_delayedSearch: function () {
			var self = this;
			clearTimeout(this.searchTimeout);
			this.searchTimeout = setTimeout(function () {
				self._search();
			}, 300);
		},

		_search: function () {

			this.search = this.$search.val();

			if (this.search) {
				this.$olderOrders.addClass('opaque');
			}

			this._hideLoadMore();
			this._fetchCollectionAndRender(true);
		},

		_refresh: function () {
			this._clearSearch();
			this._fetchCollectionAndRender(true);
		},

		_loadMore: function () {
			this.pageOffset++;
			this._clearSearch();
			this._fetchCollectionAndRender(false);
		},

		_startRotateRefresh: function () {

			// clean old interval
			clearInterval(this.rotateInterval);

			var $refresh = this.$refresh,
				self = this;

			this.rotateInterval = setInterval(function () {
				self.rotationDeg = (self.rotationDeg + 15) % 180;
				$refresh.rotate(self.rotationDeg);
			}, 20);
		},

		_stopRotateRefresh: function () {

			var self = this;

			// wait until rotation complete
			var checkInterval = setInterval(function () {
				if (self.rotationDeg === 0) {
					clearInterval(self.rotateInterval);
					clearInterval(checkInterval);
				}
			}, 10);
		},

		_resetView: function () {
			this.$olderOrders.removeClass('opaque');
			this.$ordersToday.empty();
			this.$olderOrders.empty();
		},

		_hideLoadMore: function () {
			this.$loadMore.fadeOut(100);
		},

		_showLoadMore: function () {
			this.$loadMore.fadeIn(100);
		},

		_clearSearch: function () {
			this.$search.val('');
			this.search = '';
		},

		_sendTestOrder: function () {
			var self = this;

			$.ajax({
				url: 'stores/storeAlias/testorder',
				type: 'post',
				success: function () {
					notificationcenter.notify('views.store.dashboard.testOrder.success');
					self._fetchCollectionAndRender();
				},
				error: function () {
					notificationcenter.notify('views.store.dashboard.testOrder.error');
				}
			});
		},

		_checkAllOrders: function () {
			_.each(this.collection.models, function (orderModel) {
				if (!orderModel.get('isDelivered')) {
					orderModel.save({
						isDelivered: true
					});
				}
			});
		},

		destroy: function () {
			clearInterval(this.autoRefreshInterval);
		}

	});

	return OrdersView;

});