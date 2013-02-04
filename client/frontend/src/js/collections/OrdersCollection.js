// Filename: src/js/collections/OrderCollection.js
define([
	'underscore',
	'backbone',
	'global',
	'models/OrderModel'
	], function (_, Backbone, global, OrderModel) {

	var OrderCollection = Backbone.Collection.extend({

		model: OrderModel,

		url: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/orders';
		}

	});

	return OrderCollection;
});