// Filename: src/js/models/StoreModel.js
define([
    'underscore',
    'backbone',
    'models/AddressModel',
    'collections/DeliveryAreasCollection',
    'collections/DeliveryTimesCollection'
    ], function (_, Backbone, AddressModel, DeliveryAreasCollection, DeliveryTimesCollection) {

	var StoreModel = Backbone.Model.extend({

		defaults: {
			title: '',
			alias: '',

			// payment methods
			allowsPaymentCash: false,
			allowsPaymentEc: false,
			allowsPaymentPaypal: false,

			orderEmail: '',

			deliveryAreasCollection: null,
			deliveryTimesCollection: null,

			addressModel: null,

			number: 0
		},

		idAttribute: 'alias',

		urlRoot: '/api/frontend/stores/',

		initialize: function () {

			// listen for changes in delivery areas/times collection
			this.on('change:deliveryAreasCollection', function () {
				this._listenForDeliveryAreasCollectionChanges();
			}, this);

			this.on('change:deliveryTimesCollection', function () {
				this._listenForDeliveryTimesCollectionChanges();
			}, this);

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

			return attributes;

		},

		parse: function (response) {

			if (response.hasOwnProperty('addressModel')) {
				response.addressModel = new AddressModel(response.addressModel);
			}

			if (response.hasOwnProperty('deliveryAreasCollection')) {
				response.deliveryAreasCollection = new DeliveryAreasCollection(response.deliveryAreasCollection);
			}

			if (response.hasOwnProperty('deliveryTimesCollection')) {
				response.deliveryTimesCollection = new DeliveryTimesCollection(response.deliveryTimesCollection);
			}

			return response;
		},

		validate: function (attributes) {

			var startMinutes = attributes.startMinutes;

			console.log(attributes);

			if (!attributes.allowsPaymentPaypal && !attributes.allowsPaymentEc && !attributes.allowsPaymentCash) {
				return 'at least one payment method has to be selected';
			}

		},


		isDelivering: function () {
			var isDelivering = false;

			this.get('deliveryTimesCollection').each(function (deliveryTimeModel) {
				if (deliveryTimeModel.checkIfNow()) {
					isDelivering = true;
					return;
				}
			});

			return isDelivering;
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
		}

	});

	return StoreModel;

});