// Filename: src/js/views/store/dashboard/OrdersView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/OrdersCollection',
    'views/store/dashboard/OrderView'
    ], function ($, _, Backbone, OrdersCollection, OrderView) {

	var OrdersView = Backbone.View.extend({

		$ordersToday: null,
		$olderOrders: null,
		$search: null,
		$refresh: null,

		page: 0,

		events: {
			'keyup #search': '_search',
			'keyup #refresh': '_refresh'
		},

		initialize: function () {

			this.collection = new OrdersCollection();

			this._cacheDom();
			this._fetchCollectionAndRender();

			this._listenForDestory();

		},

		_cacheDom: function () {
			this.$ordersToday = this.$('.ordersToday');
			this.$olderOrders = this.$('.olderOrders');
			this.$search = this.$('#search');
			this.$refresh = this.$('#refresh');
		},

		_listenToCollection: function () {
			this.listenTo(this.collection, 'add remove', this._render);
		},

		_fetchCollectionAndRender: function () {

			var self = this;

			this.collection.fetch({

				parse: true,

				data: $.param({
					page: this.page++
				}),

				success: function () {
					self._render();
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

		_search: function () {

		},

		_refresh: function () {

		},

		_listenForDestory: function () {
			this.once('destroy', function () {
				this.stopListening();
			}, this);
		},

		_startRotateRefresh: function () {

		},

		_stopRotateRefresh: function () {

		}

	});

	return OrdersView;

});