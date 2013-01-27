// Filename: src/js/models/StoreModel.js
define([
	'underscore',
	'backbone',
	'collections/DeliveryAreasCollection',
	'collections/DeliveryTimesCollection'
	], function (_, Backbone, DeliveryAreasCollection, DeliveryTimesCollection) {

	var StoreModel = Backbone.Model.extend({

		defaults: {
			title: '',

			alias: '',

			deliveryAreasCollection: null,
			deliveryTimesCollection: null
		},

		idAttribute: 'alias',

		urlRoot: '/api/stores/',

		initialize: function () {


			this.on('change:deliveryAreasCollection', function () {
				this.checkDeliveryAreaSelection();
			}, this);

		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (attributes.hasOwnProperty('deliveryAreasCollection')) {
				attributes.deliveryAreasCollection = attributes.deliveryAreasCollection.toJSON();
			}

			if (attributes.hasOwnProperty('deliveryTimesCollection')) {
				attributes.deliveryTimesCollection = attributes.deliveryTimesCollection.toJSON();
			}

			return attributes;

		},

		parse: function (response) {

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
			minimumValue = 0;

			var deliveryAreasCollection = this.get('deliveryAreasCollection'),
				selectedDeliveryAreaModel = deliveryAreasCollection.find(function (deliveryAreaModel) {
					return deliveryAreaModel.get('selected');
				});

			if (selectedDeliveryAreaModel) {
				minimumValue = selectedDeliveryAreaModel.get('minimumValue');
			}

			return minimumValue;
		},

		checkDeliveryAreaSelection: function () {

			// mark first delivery area as selected if none selected
			var deliveryAreasCollection = this.get('deliveryAreasCollection');

			if (deliveryAreasCollection) {
				var numberOfSelected = deliveryAreasCollection.where({
					selected: true
				}).length;

				if (numberOfSelected === 0) {
					deliveryAreasCollection.first().set('selected', true);
				}
			}
		}

	});

	return StoreModel;

});