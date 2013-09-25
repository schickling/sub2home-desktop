//Filename: src/js/models/OrderModel.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'services/notificationcenter',
    'models/AddressModel',
    'models/CreditModel',
    'collections/OrderedItemsCollection'
    ], function ($, _, Backbone, moment, notificationcenter, AddressModel, CreditModel, OrderedItemsCollection) {

	"use strict";

	// made global for performance reasons
	var now = new Date();

	var OrderModel = Backbone.Model.extend({

		defaults: {

			// paymentMethod
			paymentMethod: 'cash',

			// decoded subcard code
			subcardCode: '',

			// coupon code
			couponCode: '',

			// comment
			comment: '',

			// prices
			total: 0,
			tip: 0,

			// customer address
			addressModel: null,
			orderedItemsCollection: null,

			// due date
			dueAt: '',
			dueDate: null,

			// only needed for store.dashboard
			isDelivered: false,
			createdAt: '',
			createdDate: null,

			creditModel: null
		},

		urlRoot: function () {
			if (this.isNew()) {
				return 'stores/storeAlias/orders';
			} else {
				return 'orders';
			}
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
					response.addressModel = new AddressModel(response.addressModel, {
						parse: true
					});
				}

				if (response.hasOwnProperty('creditModel') && response.creditModel) {
					response.creditModel = new CreditModel(response.creditModel);
				}

				if (response.hasOwnProperty('orderedItemsCollection')) {
					response.orderedItemsCollection = new OrderedItemsCollection(response.orderedItemsCollection, {
						parse: true
					});
				}

				if (response.hasOwnProperty('createdAt')) {
					var c = response.createdAt;
					response.createdDate = new Date(c.substr(0, 4), c.substr(5, 2) - 1, c.substr(8, 2), c.substr(11, 2), c.substr(14, 2), c.substr(17, 2));
				}

				if (response.hasOwnProperty('dueAt') && response.dueAt) {
					var d = response.dueAt;
					response.dueDate = new Date(d.substr(0, 4), d.substr(5, 2) - 1, d.substr(8, 2), d.substr(11, 2), d.substr(14, 2), d.substr(17, 2));
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

			if (this.get('creditModel')) {
				attributes.creditModel = attributes.creditModel.toJSON();
			}

			if (this.get('dueDate')) {
				var dueMoment = moment(attributes.dueDate);
				attributes.dueAt = dueMoment.format('YYYY-MM-DD HH:mm:ss');
			}

			return attributes;
		},

		wasCreatedToday: function () {
			return now.toDateString() === this.get('createdDate').toDateString();
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

			if (attributes.total < 0 || attributes.tip < 0) {
				return 'Kein erlaubter Wert';
			}
		},

		increaseTip: function () {
			var tip = this.get('tip'),
				total = this.get('total'),
				totalWithTip = total + tip,
				step = 0.50,
				isRound = (totalWithTip % step) === 0;

			if (isRound) {
				tip += step;
			} else {

				var benefit = Math.ceil(total) - total;

				if (benefit > step) {
					tip = benefit - step;
				} else {
					tip = benefit;
				}

			}

			this.set({
				tip: tip
			}, {
				validate: true
			});

		},

		decreaseTip: function () {
			var tip = this.get('tip'),
				step = 0.50;

			if (tip >= step) {
				tip -= step;
			} else {
				tip = 0;
			}

			this.set({
				tip: tip
			}, {
				validate: true
			});
		},

		getNumber: function () {
			var number = '00000' + this.get('id');

			return number.substr(number.length - 6);
		},

		hasCredit: function () {
			return this.get('creditModel') !== null;
		},

		// 10-41786-0-0329-0609
		isCouponCodeValid: function () {
			var regex = /^(\d){2}-(\d){5}-(\d)-(\d){4}-(\d){4}$/,
				code = this.get('couponCode');

			return regex.test(code);
		}

	});

	return OrderModel;
});