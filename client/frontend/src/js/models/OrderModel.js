//Filename: src/js/models/OrderModel.js
define([
	'jquery',
	'underscore',
	'backbone',
	'global'
	], function ($, _, Backbone, global) {

	var OrderModel = Backbone.Model.extend({

		defaults: {
			isDelivered: false,
			paymentMethod: '',
			total: 0,
			credit: 0,
			addressModel: null,
			orderedItemsCollection: null
		},

		toJSON: function () {
			var attributes = _.clone(this.attributes);

			if (this.get('orderedItemsCollection')) {
				attributes.orderedItemsCollection = attributes.orderedItemsCollection.toJSON();
			}

			if (this.get('addressModel')) {
				attributes.addressModel = attributes.addressModel.toJSON();
			}

			return attributes;
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/orders';
		}

	});

	return OrderModel;
});