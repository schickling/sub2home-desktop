// Filename: src/js/views/store/dashboard/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'views/PageView',
	'views/store/dashboard/OrdersView',
	'views/store/dashboard/revenues/RevenuesView',
	'text!templates/store/dashboard/MainTemplate.html'
	], function ($, _, Backbone, router, stateModel, PageView, OrdersView, RevenuesView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {

			// to be absolutly consistent reload the store model from server
			this.model = stateModel.get('storeModel');
			this.model.fetch({
				async: false
			});

			// check if client is allowed to view this page
			if (stateModel.clientOwnsThisStore()) {
				this._render();
			} else {
				router.navigate('login', {
					trigger: true,
					replace: true
				});
			}

		},

		_render: function () {

			this.$el.html(MainTemplate);

			this._renderOrders();

			// needs to be appended first for overscroll to work
			this.append();

			this._renderRevenues();


		},

		_renderOrders: function () {
			new OrdersView({
				el: this.$('.content')
			});
		},

		_renderRevenues: function () {
			new RevenuesView({
				el: this.$('.note.orders'),
				collection: this.model.get('invoicesCollection')
			});
		}

	});

	return MainView;

});