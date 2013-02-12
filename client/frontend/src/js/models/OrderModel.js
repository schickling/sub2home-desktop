//Filename: src/js/models/OrderModel.js
define([
	'jquery',
	'underscore',
	'backbone',
	'global',
	'notificationcenter',
	'models/AddressModel',
	'collections/OrderedItemsCollection'
	], function ($, _, Backbone, global, notificationcenter, AddressModel, OrderedItemsCollection) {

	// made global for performance reasons
	var now = new Date();

	var OrderModel = Backbone.Model.extend({

		defaults: {
			isDelivered: false,

			// paymentMethod
			paymentMethod: 'cash',

			// comment
			comment: '',

			// prices
			total: 0,
			credit: 0,

			// relations
			addressModel: null,
			// customer address
			orderedItemsCollection: null,

			// dates
			created_at: '',
			due_at: '',
			createdDate: null,
			dueDate: null
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/orders';
		},

		initialize: function () {

			// initialize ordered items collection and address model
			this._initializeRelations();

			this.on('invalid', function (model, error) {
				notificationcenter.error(error, error);
			});
		},

		_initializeRelations: function () {

			// ordered items
			if (!this.get('orderedItemsCollection')) {
				this.set('orderedItemsCollection', new OrderedItemsCollection());
			}

			// listen for changes in ordered items collection
			var orderedItemsCollection = this.get('orderedItemsCollection');

			orderedItemsCollection.on('add remove reset', function () {
				this.set('total', orderedItemsCollection.getTotal());
			}, this);


			// address model
			if (!this.get('addressModel')) {
				this.set('addressModel', new AddressModel());
			}

			// listen for addressmodel changes
			this.get('addressModel').on('change', function () {
				this.trigger('change');
			}, this);

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
					console.log(response.dueDate);
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

			if (this.get('dueDate')) {
				attributes.due_at = attributes.dueDate.getTime();
			}

			return attributes;
		},

		wasCreatedToday: function () {
			return (now.getDay() === this.get('createdDate').getDay());
		},

		validate: function (attributes) {
			var validPaymentMethods = ['cash', 'ec', 'paypal'];
			if (!_.contains(validPaymentMethods, attributes.paymentMethod)) {
				return 'Keine erlaubte Bezahlmethode';
			}
		}

	});

	return OrderModel;
});