// Filename: src/js/models/cartModel.js
define([
    'underscore',
    'backbone',
    'backboneLocalStorage',
    'models/stateModel',
    'models/OrderModel'
], function (_, Backbone, backboneLocalStorage, stateModel, OrderModel) {

	"use strict";

	var CartModel = Backbone.Model.extend({

		localStorage: new Backbone.LocalStorage('CartModel'),

		defaults: {

			// id needed for singleton
			id: 0,

			orderModel: null,

			termsAccepted: false,
			isClosed: false

		},

		initialize: function () {

			this._initializeData();

			// determine if on last reload store was changed
			if (stateModel.hasChangedStore()) {
				this._resetOrderModel();
			}

			stateModel.on('change:storeModel', function () {
				// reset ordered items collection on store change
				this._resetOrderModel();
				this._listenToDeliveryAreaSelection();
			}, this);

			this._listenToDeliveryAreaSelection();

		},

		_initializeData: function () {

			// fetch if exists
			var couldBeFetched = true;
			this.fetch({
				error: function () {
					couldBeFetched = false;
				}
			});

			this.on('change', function () {
				// console.log('cart saved');
				// console.log(this.changedAttributes());
				this.save({}, {
					silent: true
				});
			}, this);

			if (!couldBeFetched) {
				this.set('orderModel', new OrderModel());
			}

			this._listenToOrderModel();

		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (attributes.hasOwnProperty('orderModel')) {
				attributes.orderModel = attributes.orderModel.toJSON();
			}

			return attributes;
		},

		parse: function (response) {

			if (response.hasOwnProperty('orderModel')) {

				// following distinction takes place because parse is called every time
				// the cart model gets saved
				var currentOrderModel = this.get('orderModel');

				// if addressmodel already initialized it doesn't need to be initialize twice
				if (currentOrderModel) {
					response.orderModel = currentOrderModel;
				} else {
					response.orderModel = new OrderModel(response.orderModel, {
						parse: true
					});
				}

			}

			return response;
		},

		_resetOrderModel: function () {

			// reset order model
			var orderModel = new OrderModel(),
				storeModel = stateModel.get('storeModel');

			this.set('orderModel', orderModel);

			this._listenToOrderModel();

			this._adjustCustomerAddress();

		},

		_listenToOrderModel: function () {
			var orderModel = this.get('orderModel');

			// listen for changes in order model
			orderModel.on('change', function () {
				this.trigger('change');
			}, this);
		},

		_listenToDeliveryAreaSelection: function () {
			var storeModel = stateModel.get('storeModel');

			if (storeModel) {
				storeModel.on('change', this._adjustCustomerAddress, this);
			}
		},

		_adjustCustomerAddress: function () {
			// copy postal and city to customer address
			var storeModel = stateModel.get('storeModel'),
				orderModel = this.get('orderModel'),
				addressModel = orderModel.get('addressModel'),
				selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel();

			addressModel.set({
				postal: selectedDeliveryAreaModel.get('postal'),
				city: selectedDeliveryAreaModel.get('city'),
				district: selectedDeliveryAreaModel.get('district')
			});
		},


		/*
		 * Wrapper methods around order model
		 */

		getCustomerAddressModel: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('addressModel');
		},

		getOrderedItemsCollection: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('orderedItemsCollection');
		},

		addOrderedItemModel: function (orderedItemModel) {

			this.set('isClosed', false);

			var orderedItemsCollection = this.getOrderedItemsCollection();

			orderedItemModel.trigger('recalculate');
			orderedItemsCollection.add(orderedItemModel);

			orderedItemModel.set('isInCart', true);
		},

		getPaymentMethod: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('paymentMethod');
		},

		setPaymentMethod: function (paymentMethod) {
			var orderModel = this.get('orderModel');

			orderModel.set({
				paymentMethod: paymentMethod
			}, {
				validate: true
			});
		},

		getTotal: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('total');
		},

		getTip: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('tip');
		},

		getNumberOfOrderedItems: function () {
			var orderModel = this.get('orderModel'),
				orderedItemsCollection = orderModel.get('orderedItemsCollection'),
				numberOfOrderedItems = 0;

			_.each(orderedItemsCollection.models, function (orderedItemModel) {
				numberOfOrderedItems += orderedItemModel.get('amount');
			});

			return numberOfOrderedItems;
		},

		getComment: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('comment');
		},

		setComment: function (comment) {
			var orderModel = this.get('orderModel');

			orderModel.set({
				comment: comment
			}, {
				validate: true
			});
		},


		/*
		 * Due date stuff
		 */

		getDueDate: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('dueDate');
		},

		_getValidDueDate: function (options) {
			var storeModel = stateModel.get('storeModel');

			return storeModel.getValidDueDate(options);
		},

		validateDueDate: function () {
			var orderModel = this.get('orderModel'),
				options = {
					dueDate: this.getDueDate()
				};

			orderModel.set('dueDate', this._getValidDueDate(options));
		},

		isValidDueDateChange: function (minutesToAdd) {

			var options = {
				dueDate: this.getDueDate(),
				minutesToAdd: minutesToAdd
			};

			return this._getValidDueDate(options) !== null;
		},

		changeDueDate: function (minutesToAdd) {
			var orderModel = this.get('orderModel'),
				options = {
					dueDate: this.getDueDate(),
					minutesToAdd: minutesToAdd
				};

			orderModel.set('dueDate', this._getValidDueDate(options));
		},

		getMinimumValue: function () {
			var storeModel = stateModel.get('storeModel');

			return storeModel.getMinimumValue();
		},

		getMinimumDuration: function () {
			var storeModel = stateModel.get('storeModel');

			return storeModel.getMinimumDuration();
		},

		isMinimumReached: function () {
			var orderModel = this.get('orderModel'),
				storeModel = stateModel.get('storeModel');

			return orderModel.get('total') >= storeModel.getMinimumValue();
		},

		cleanUp: function () {
			var orderModel = this.get('orderModel');

			orderModel.get('orderedItemsCollection').reset();
			orderModel.set({
				total: 0,
				tip: 0,
				comment: '',
				couponCode: '',
				subcardCode: ''
			});

			this.set('termsAccepted', false);
		},

		isCouponCodeValid: function () {
			return this.get('orderModel').isCouponCodeValid();
		}

	});

	return new CartModel();
});