// Filename: src/js/models/StoreModel.js
define([
    'underscore',
    'backbone',
    'notificationcenter',
    'models/AddressModel',
    'collections/DeliveryAreasCollection',
    'collections/DeliveryTimesCollection',
    'collections/InvoicesCollection'
    ], function (_, Backbone, notificationcenter, AddressModel, DeliveryAreasCollection, DeliveryTimesCollection, InvoicesCollection) {

	"use strict";

	var StoreModel = Backbone.Model.extend({

		defaults: {
			title: '',
			alias: '',
			facebookUrl: '',

			// payment methods
			allowsPaymentCash: false,
			allowsPaymentEc: false,
			allowsPaymentPaypal: false,

			orderEmail: '',

			deliveryAreasCollection: null,
			deliveryTimesCollection: null,
			invoicesCollection: null,
			addressModel: null,

			number: 0,

			// needed in client.dashboard
			numberOfUndoneOrders: 0
		},

		idAttribute: 'alias',

		urlRoot: 'stores',

		initialize: function () {

			// listen for changes in delivery areas/times collection
			this.on('change:deliveryAreasCollection', function () {
				this._listenForDeliveryAreasCollectionChanges();
			}, this);

			this.on('change:deliveryTimesCollection', function () {
				this._listenForDeliveryTimesCollectionChanges();
			}, this);

			// throw errors
			this.on('invalid', function (model, error) {
				notificationcenter.notify('models.storeModel.invalid', {
					error: error
				});
			});

			this._listenForDeliveryAreasCollectionChanges();
			this._listenForDeliveryTimesCollectionChanges();

		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (attributes.hasOwnProperty('addressModel') && attributes.addressModel) {
				attributes.addressModel = attributes.addressModel.toJSON();
			}

			if (attributes.hasOwnProperty('deliveryAreasCollection') && attributes.deliveryAreasCollection) {
				attributes.deliveryAreasCollection = attributes.deliveryAreasCollection.toJSON();
			}

			if (attributes.hasOwnProperty('deliveryTimesCollection') && attributes.deliveryTimesCollection) {
				attributes.deliveryTimesCollection = attributes.deliveryTimesCollection.toJSON();
			}

			if (attributes.hasOwnProperty('invoicesCollection') && attributes.invoicesCollection) {
				attributes.invoicesCollection = attributes.invoicesCollection.toJSON();
			}

			return attributes;

		},

		parse: function (response) {

			if (response) {

				if (response.hasOwnProperty('addressModel')) {
					response.addressModel = new AddressModel(response.addressModel, {
						parse: true
					});
				}

				if (response.hasOwnProperty('deliveryAreasCollection')) {
					response.deliveryAreasCollection = new DeliveryAreasCollection(response.deliveryAreasCollection);
				}

				if (response.hasOwnProperty('deliveryTimesCollection')) {
					response.deliveryTimesCollection = new DeliveryTimesCollection(response.deliveryTimesCollection);
				}

				if (response.hasOwnProperty('invoicesCollection') && response.invoicesCollection) {
					response.invoicesCollection = new InvoicesCollection(response.invoicesCollection);
				}

				return response;

			}
		},

		validate: function (attributes) {

			if (!attributes.allowsPaymentPaypal && !attributes.allowsPaymentEc && !attributes.allowsPaymentCash) {
				return 'at least one payment method has to be selected';
			}

		},

		isDelivering: function () {
			return this._getCurrentDeliveryTimeModel() !== null;
		},

		_getCurrentDeliveryTimeModel: function () {
			var currentDeliveryModel = null,
				deliveryTimesCollection = this.get('deliveryTimesCollection');

			_.each(deliveryTimesCollection.models, function (deliveryTimeModel) {
				if (deliveryTimeModel.checkIfNow()) {
					currentDeliveryModel = deliveryTimeModel;
					return;
				}
			});

			return currentDeliveryModel;
		},

		getNextDeliveryTimeModel: function () {
			var deliveryTimesCollection = this.get('deliveryTimesCollection');

			return deliveryTimesCollection.getNextDeliveryTimeModel();
		},

		getMinimumValue: function () {
			var selectedDeliveryAreaModel = this.getSelectedDeliveryAreaModel();

			return selectedDeliveryAreaModel.get('minimumValue');
		},

		getMinimumDuration: function () {
			var selectedDeliveryAreaModel = this.getSelectedDeliveryAreaModel();

			return selectedDeliveryAreaModel.get('minimumDuration');
		},

		getSelectedDeliveryAreaModel: function () {
			var deliveryAreasCollection = this.get('deliveryAreasCollection'),
				selectedDeliveryAreaModel = deliveryAreasCollection.find(function (deliveryAreaModel) {
					return deliveryAreaModel.get('isSelected');
				});

			// lazy select delivery area after it got parsed from server
			// and thus the customer didn't selected a delivery area
			if (selectedDeliveryAreaModel) {
				return selectedDeliveryAreaModel;
			} else {
				return deliveryAreasCollection.first().set('isSelected', true);
			}

		},

		getValidDueDate: function (options) {

			var now = new Date();

			// prepare options
			options = options || {};

			// prepare variables
			var checkOnly = options.minutesToAdd !== undefined,
				dateWasGiven = options.dueDate !== undefined,
				minutesToAdd = options.minutesToAdd || 0,
				dueDate = options.dueDate || now,
				isDelivering = this.isDelivering();

			// add minutes
			dueDate = this._addMinutesToDate(dueDate, minutesToAdd);

			var spareMinutes = Math.ceil((dueDate - now) / 60000) - 1,
				minimumDuration = this.getMinimumDuration();

			// check if due date respects minimum duration
			if (spareMinutes < minimumDuration) {
				if (checkOnly) {
					return null;
				}

				dueDate = this._addMinutesToDate(dueDate, minimumDuration - spareMinutes);
			}

			var contemporaryDayOfWeek = now.getDay(),
				totalMinutesOfDueDate = dueDate.getMinutes() + dueDate.getHours() * 60,
				deliveryTimesCollection = this.get('deliveryTimesCollection'),
				contemporaryDeliveryTimeModels = deliveryTimesCollection.filter(function (deliveryTimeModel) {
					return deliveryTimeModel.get('dayOfWeek') === contemporaryDayOfWeek && deliveryTimeModel.get('endMinutes') >= totalMinutesOfDueDate;
				});

			// find delivery time model with smallest start minutes
			var nextDeliveryTimeModel;

			// check if is currently delivering
			if (isDelivering && !checkOnly) {

				nextDeliveryTimeModel = this._getCurrentDeliveryTimeModel();

			} else {

				_.each(contemporaryDeliveryTimeModels, function (deliveryTimeModel) {
					if (!nextDeliveryTimeModel || nextDeliveryTimeModel.get('startMinutes') > deliveryTimeModel.get('startMinutes')) {
						nextDeliveryTimeModel = deliveryTimeModel;
					}
				});

			}


			if (nextDeliveryTimeModel) {

				// check if due date still matches delivery time model
				if (nextDeliveryTimeModel.get('endMinutes') < totalMinutesOfDueDate && !isDelivering) {
					// try again and reset given duedate
					return this.getValidDueDate();
				}

				// increase due date so it matches a delivery time if its to small
				if (nextDeliveryTimeModel.get('startMinutes') > totalMinutesOfDueDate) {

					// needed to check if changes would be valid
					if (checkOnly) {
						return null;
					}

					dueDate = this._addMinutesToDate(dueDate, nextDeliveryTimeModel.get('startMinutes') - totalMinutesOfDueDate);
				}

				return dueDate;

			} else {
				return null;
			}

		},

		_listenForDeliveryAreasCollectionChanges: function () {
			var deliveryAreasCollection = this.get('deliveryAreasCollection');

			if (deliveryAreasCollection) {
				deliveryAreasCollection.on('add remove change', function () {
					this.trigger('change');
				}, this);
			}
		},

		_listenForDeliveryTimesCollectionChanges: function () {
			var deliveryTimesCollection = this.get('deliveryTimesCollection');

			if (deliveryTimesCollection) {
				deliveryTimesCollection.on('add remove change', function () {
					this.trigger('change');
				}, this);
			}
		},

		_addMinutesToDate: function (date, minutes) {
			return new Date(date.getTime() + minutes * 60000);
		}

	});

	return StoreModel;

});