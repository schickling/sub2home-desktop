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

			orderEmail: '',

			deliveryAreasCollection: null,
			deliveryTimesCollection: null,

			addressModel: null
		},

		idAttribute: 'alias',

		urlRoot: '/api/frontend/stores/',

		initialize: function () {


			// listen for changes in delivery areas/times collection
			this.on('change:deliveryAreasCollection', function () {
				this.listenForDeliveryAreasCollectionChanges();
			}, this);

			this.on('change:deliveryTimesCollection', function () {
				this.listenForDeliveryTimesCollectionChanges();
			}, this);

			this.listenForDeliveryAreasCollectionChanges();
			this.listenForDeliveryTimesCollectionChanges();

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

		getSelectedDeliveryAreaModel: function () {
			var deliveryAreasCollection = this.get('deliveryAreasCollection'),
				selectedDeliveryAreaModel = deliveryAreasCollection.find(function (deliveryAreaModel) {
					return deliveryAreaModel.get('selected');
				});

			if (selectedDeliveryAreaModel) {
				return selectedDeliveryAreaModel;
			} else {
				// mark first delivery area as selected if no one was selected
				return deliveryAreasCollection.first().set('selected', true);
			}
		},

		listenForDeliveryAreasCollectionChanges: function () {
			var deliveryAreasCollection = this.get('deliveryAreasCollection');

			if (deliveryAreasCollection) {
				deliveryAreasCollection.on('add remove change', function () {
					this.trigger('change');
				}, this);
			}
		},

		listenForDeliveryTimesCollectionChanges: function () {
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