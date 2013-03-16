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

			// paymentMethod
			paymentMethod: 'cash',

			// comment
			comment: '',

			// prices
			total: 0,
			credit: 0,

			// customer address
			addressModel: null,
			orderedItemsCollection: null,

			// due date
			due_at: '',
			dueDate: null,

			// only needed for store.dashboard
			isDelivered: false,
			created_at: '',
			createdDate: null,
			balance_order_model_id: 0
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/orders';
		},

		initialize: function () {

			// initialize ordered items collection and address model
			this._initializeRelations();

			this.on('invalid', function (model, error) {
				notificationcenter.notify('models.orderModel.invalid', {
					error: error
				});
			});
		},

		_initializeRelations: function () {

			// ordered items
			if (!this.get('orderedItemsCollection')) {
				this.set('orderedItemsCollection', new OrderedItemsCollection());
			}

			// listen for changes in ordered items collection
			var orderedItemsCollection = this.get('orderedItemsCollection');

			orderedItemsCollection.on('add remove reset change', function () {

				// trigger change manually since it won't be triggered if price hasn't changed
				this.set({
					total: orderedItemsCollection.getTotal()
				}, {
					silent: true
				});

				this.trigger('change');

			}, this);


			// due date
			if (!this.get('dueDate')) {
				this.set('dueDate', new Date());
			}

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

				if (response.hasOwnProperty('due_at') && response.due_at) {
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

			var comment = attributes.comment;
			if (comment.length > 1000 || comment.split(/\n|\f/).length > 6) {
				return 'Kommentar ist zu lang';
			}

			if (attributes.total < 0 || attributes.credit < 0) {
				return 'Kein erlaubter Wert';
			}
		},

		increaseCredit: function () {
			var credit = this.get('credit'),
				total = this.get('total'),
				totalWithCredit = total + credit,
				step = 0.50,
				isRound = (totalWithCredit % step) === 0;

			if (isRound) {
				credit += step;
			} else {

				var benefit = Math.ceil(total) - total;

				if (benefit > step) {
					credit = benefit - step;
				} else {
					credit = benefit;
				}

			}

			this.set({
				credit: credit
			}, {
				validate: true
			});

		},

		decreaseCredit: function () {
			var credit = this.get('credit'),
				step = 0.50;

			if (credit >= step) {
				credit -= step;
			} else {
				credit = 0;
			}

			this.set({
				credit: credit
			}, {
				validate: true
			});
		},

		isBalanceOrderModel: function() {
			return this.get('balance_order_model_id') !== 0;
		},

		getBalanceOrderNumber: function() {
			var orderNumber = '00000' + this.get('balance_order_model_id');

			return orderNumber.substr(orderNumber.length - 6);
		},

		getOrderNumber: function() {
			var orderNumber = '00000' + this.get('id');

			return orderNumber.substr(orderNumber.length - 6);
		}

	});

	return OrderModel;
});