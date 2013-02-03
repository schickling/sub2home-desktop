// Filename: src/js/models/cartModel.js
define([
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/stateModel',
	'models/AddressModel',
	'collections/OrderedItemsCollection'
	], function (_, Backbone, backboneLocalStorage, stateModel, AddressModel, OrderedItemsCollection) {

	var CartModel = Backbone.Model.extend({

		localStorage: new Backbone.LocalStorage('CartModel'),

		defaults: {

			// id needed for singleton
			id: 0,

			// customer address
			addressModel: null,

			// ordered items
			orderedItemsCollection: null,
			amount: 0,
			total: 0,

			// gets calculated from store model
			minimum: 0

		},

		initialize: function () {

			this.initializeData();

			// listen for changes in ordered items collection
			this.get('orderedItemsCollection').on('add remove reset', function () {
				this.processOrderedItems();
			}, this);

			// determine if on last reload store was changed
			if (stateModel.hasChangedStore()) {
				this.changeStore();
			}

			// reset ordered items collection on store change
			stateModel.on('change:storeModel', this.changeStore, this);

		},

		initializeData: function () {
			// fetch if exists
			this.fetch(0);

			this.on('change', function () {
				console.log('cart saved');
				console.log(this.changedAttributes());
				this.save({}, {
					silent: true
				});
			}, this);

			// initialize ordered items collection
			if (!this.get('orderedItemsCollection')) {
				this.set('orderedItemsCollection', new OrderedItemsCollection());
			}

			// initialize address model
			if (!this.get('addressModel')) {
				this.set('addressModel', new AddressModel());
			}
		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (attributes.hasOwnProperty('orderedItemsCollection')) {
				attributes.orderedItemsCollection = attributes.orderedItemsCollection.toJSON();
			}

			if (attributes.hasOwnProperty('addressModel')) {
				attributes.addressModel = attributes.addressModel.toJSON();
			}

			return attributes;
		},

		parse: function (response) {

			if (response.hasOwnProperty('orderedItemsCollection')) {

				var currentOrderedItemsCollection = this.get('orderedItemsCollection');

				// if orderedItemsCollection already initialized it doesn't need to be initialize twice
				if (currentOrderedItemsCollection) {
					response.orderedItemsCollection = currentOrderedItemsCollection;
				} else {
					response.orderedItemsCollection = new OrderedItemsCollection(response.orderedItemsCollection, {
						parse: true
					});
				}

				if (response.hasOwnProperty('addressModel')) {
					response.addressModel = new AddressModel(response.addressModel);
				}

			}

			return response;
		},

		changeStore: function () {
			// reset ordered items collection
			this.get('orderedItemsCollection').reset();

			// set minimum
			var storeModel = stateModel.get('storeModel');
			this.set('minimum', storeModel.getMinimumValue());
		},

		processOrderedItems: function () {

			var orderedItemsCollection = this.get('orderedItemsCollection');

			console.log(orderedItemsCollection.toJSON());

			// sum up ordered items and set amount
			this.set({
				total: orderedItemsCollection.getTotal(),
				amount: orderedItemsCollection.length
			});
		}

	});

	return new CartModel();
});