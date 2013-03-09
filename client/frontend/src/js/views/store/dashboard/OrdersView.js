// Filename: src/js/views/store/dashboard/OrdersView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/OrdersCollection',
    'views/store/dashboard/OrderView'
    ], function ($, _, Backbone, OrdersCollection, OrderView) {

	$.fn.extend({
		rotate: function (deg) {
			var $this = $(this);

			$this.css({
				'-webkit-transform': 'rotate(' + deg + 'deg)',
				'-moz-transform': 'rotate(' + deg + 'deg)',
				'-ms-transform': 'rotate(' + deg + 'deg)',
				'-o-transform': 'rotate(' + deg + 'deg)',
				'transform': 'rotate(' + deg + 'deg)'
			});
		}
	});

	var OrdersView = Backbone.View.extend({

		$ordersToday: null,
		$olderOrders: null,
		$search: null,
		$refresh: null,
		$loadMore: null,

		// pagination counter
		page: 0,

		// search value for fetching
		search: '',

		rotateInterval: null,

		searchTimeout: null,

		events: {
			'keyup #search': '_delayedSearch',
			'click #refresh': '_refresh',
			'click #loadMore': '_loadMore'
		},

		initialize: function () {

			this.collection = new OrdersCollection();

			this._cacheDom();
			this._fetchCollection();

		},

		_cacheDom: function () {
			this.$ordersToday = this.$('.ordersToday');
			this.$olderOrders = this.$('.olderOrders');
			this.$search = this.$('#search');
			this.$refresh = this.$('#refresh');
			this.$loadMore = this.$('#loadMore');
		},

		_listenToCollection: function () {
			this.listenTo(this.collection, 'add remove', this._render);
		},

		_fetchCollection: function () {

			var self = this;

			this._startRotateRefresh();

			this.collection.fetch({

				parse: true,

				data: $.param({
					search: this.search,
					page: this.page
				}),

				success: function (collection, receivedOrders) {
					self._render();
					self._stopRotateRefresh();

					if (receivedOrders.length === 0) {
						self._hideLoadMore();
					}
				},

				error: function() {
					self._stopRotateRefresh();
				}

			});

		},

		_render: function () {
			_.each(this.collection.models, function (orderModel) {
				this._renderOrder(orderModel);
			}, this);
		},

		_renderOrder: function (orderModel) {
			var orderView = new OrderView({
				model: orderModel
			});

			if (orderModel.wasCreatedToday()) {
				this.$ordersToday.append(orderView.el);
			} else {
				this.$olderOrders.append(orderView.el);
			}

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

			this._resetView();
			this._hideLoadMore();
			this._fetchCollection();
		},

		_refresh: function () {
			this._clearSearch();
			this._resetView();
			this._fetchCollection();
		},

		_loadMore: function () {
			this.page++;
			this._clearSearch();
			this._fetchCollection();
		},

		_startRotateRefresh: function () {

			var $refresh = this.$refresh,
				deg = 0;

			this.rotateInterval = setInterval(function () {
				deg = (deg + 15) % 360;
				$refresh.rotate(deg);
			}, 20);
		},

		_stopRotateRefresh: function () {
			clearInterval(this.rotateInterval);
			this.$refresh.rotate(0);
		},

		_resetView: function () {
			this.page = 0;
			this._showLoadMore();
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
		}

	});

	return OrdersView;

});