// Filename: src/js/collections/OrderCollection.js
define([
	'underscore',
	'backbone',
	'models/OrderModel'
	], function (_, Backbone, OrderModel) {

	var OrderCollection = Backbone.Collection.extend({

		model: OrderModel,

		url: function () {
			return 'stores/storeAlias/orders';
		}

	});

	return OrderCollection;
});