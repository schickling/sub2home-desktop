// Filename: src/js/models/cartModel.js
define([
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/stateModel',
	'models/OrderModel'
	], function (_, Backbone, backboneLocalStorage, stateModel, OrderModel) {

	var CartModel = Backbone.Model.extend({

		localStorage: new Backbone.LocalStorage('CartModel'),

		defaults: {

			// id needed for singleton
			id: 0,

			orderModel: null,

			// gets calculated from store model
			// ... mirrored for convenience reasons
			minimum: 0

		},

		initialize: function () {

			this._initializeData();

			// determine if on last reload store was changed
			if (stateModel.hasChangedStore()) {
				this._changeStore();
			}

			// reset ordered items collection on store change
			stateModel.on('change:storeModel', this._changeStore, this);

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
				console.log('cart saved');
				console.log(this.changedAttributes());
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

		_listenToOrderModel: function () {
			var orderModel = this.get('orderModel');

			// listen for changes in order model
			orderModel.on('change', function () {
				this.trigger('change');
			}, this);
		},

		_changeStore: function () {

			var orderModel = new OrderModel(),
				storeModel = stateModel.get('storeModel');

			this.set('orderModel', orderModel);

			this._listenToOrderModel();

			// set minimum
			this.set({
				minimum: storeModel.getMinimumValue()
			});

			// copy postal and city to customer address
			var addressModel = orderModel.get('addressModel'),
				selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel();

			addressModel.set({
				postal: selectedDeliveryAreaModel.get('postal'),
				city: selectedDeliveryAreaModel.get('description')
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
			var orderedItemsCollection = this.getOrderedItemsCollection();

			orderedItemsCollection.add(orderedItemModel);
		},

		getPaymentMethod: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('paymentMethod');
		},

		setPaymentMethod: function (paymentMethod) {
			var orderModel = this.get('orderModel');
			console.log('jooaso');

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

		getNumberOfOrderedItems: function () {
			var orderModel = this.get('orderModel');

			return orderModel.get('orderedItemsCollection').length;
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

		getValidDueDate: function () {
			var orderModel = this.get('orderModel'),
				dueDate = orderModel.get('dueDate');

			if (!dueDate || !this._isDueDateValid()) {
				this._correctDueDate();
			}

			return orderModel.get('dueDate');
		},

		setDueDate: function (dueDate) {
			var orderModel = this.get('orderModel');

			orderModel.set('dueDate', dueDate);
		},

		_isDueDateValid: function () {
			return this.getSpareMinutes() >= 0;
		},

		_correctDueDate: function () {
			var orderModel = this.get('orderModel'),
				now = new Date(),
				storeModel = stateModel.get('storeModel'),
				minimumDuration = storeModel.getMinimumDuration();

			var dueDate = new Date(now.getTime() + minimumDuration * 60000); // 60 * 1000
			orderModel.set({
				dueDate: dueDate
			}, {
				silent: true
			});
		},

		// time between duedate and now + mininum duration
		getSpareMinutes: function () {
			var now = new Date(),
				orderModel = this.get('orderModel'),
				dueDate = orderModel.get('dueDate'),
				storeModel = stateModel.get('storeModel'),
				minimumDuration = storeModel.getMinimumDuration(),
				// one minute tolerance
				spareMilliseconds = dueDate.getTime() - now.getTime() - minimumDuration * 59000;
			spareMinutes = parseInt(spareMilliseconds / 60000, 10);

			return spareMinutes;
		}


	});

	return new CartModel();
});