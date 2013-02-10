//Filename: src/js/models/OrderModel.js
define([
	'jquery',
	'underscore',
	'backbone',
	'global',
	'models/AddressModel',
	'collections/OrderedItemsCollection'
	], function ($, _, Backbone, global, AddressModel, OrderedItemsCollection) {

	// made global for performance reasons
	var now = new Date();

	var OrderModel = Backbone.Model.extend({

		defaults: {
			isDelivered: false,
			paymentMethod: '',
			total: 0,
			credit: 0,
			addressModel: null,
			orderedItemsCollection: null,
			created_at: '',
			due_at: '',
			createdDate: null,
			dueDate: null
		},

		urlRoot: function() {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/orders';
		},

		parse: function (response) {

			if (response) {

				if (response.hasOwnProperty('addressModel')) {
					response.addressModel = new AddressModel(response.addressModel);
				}

				if (response.hasOwnProperty('orderedItemsCollection')) {
					response.orderedItemsCollection = new OrderedItemsCollection(response.orderedItemsCollection, {
						parse: true
					});
				}

				if (response.hasOwnProperty('created_at')) {
					response.createdDate = new Date(response.created_at);
				}

				if (response.hasOwnProperty('due_at')) {
					response.dueDate = new Date(response.due_at);
				}

				return response;

			}

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

		isToday: function () {
			return (now.getDay() === this.get('createdDate').getDay());
		}

	});

	return OrderModel;
});