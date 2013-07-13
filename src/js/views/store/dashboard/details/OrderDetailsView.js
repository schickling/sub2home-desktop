// Filename: src/js/views/store/dashboard/OrderDetailsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/dashboard/details/AddressView',
    'views/store/dashboard/details/OrderedItemsView',
    'views/store/dashboard/details/InfoView',
    'text!templates/store/dashboard/details/OrderDetailsTemplate.html'
    ], function ($, _, Backbone, AddressView, OrderedItemsView, InfoView, OrderDetailsTemplate) {

	"use strict";

	var OrderDetailsView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(OrderDetailsTemplate);

			this._renderAddress();
			this._renderOrderedItems();
			this._renderInfo();
		},

		_renderAddress: function () {
			new AddressView({
				el: this.$('.address'),
				model: this.model.get('addressModel')
			});
		},

		_renderOrderedItems: function () {
			new OrderedItemsView({
				el: this.$('.orderedItems'),
				collection: this.model.get('orderedItemsCollection')
			});
		},

		_renderInfo: function () {
			new InfoView({
				el: this.$('.info'),
				model: this.model
			});
		}

	});

	return OrderDetailsView;

});